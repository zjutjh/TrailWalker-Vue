import { getData, postData } from "./fetch";
// tslint:disable: no-console
declare global {
    interface Window { PublicKeyCredential: any; }
    interface Navigator {credentials: any; }
}
interface PublicKey {
    challenge: any;
    allowCredentials:
    {
        forEach: (arg0: (listItem: any) => void) => void;
    };
}
interface NewCredential {
    response:
    {
        attestationObject:
        Iterable<number>;
        clientDataJSON: Iterable<number>;
    };
    rawId: Iterable<number>;
    id: any;
    type: any;
}
interface AssertedCredential {
    response:
    {
        authenticatorData: Iterable<number>;
        clientDataJSON: Iterable<number>;
        signature: Iterable<number>;
        userHandle: Iterable<number>;
     };
     rawId: Iterable<number>;
     id: any;
     type: any;
}

interface WebAuthnArgs {
    username: string;
    attestation_type: string;
    authenticator_attachment: string;
}
class WebAuthn {
    public state = {
        createResponse: null,
        publicKeyCredential: null,
        credential: null,
        user: {
            name: "testuser@example.com",
            displayName: "testuser",
        },
    };
    private args: WebAuthnArgs;
    constructor(a: WebAuthnArgs) {
        this.state.user.name = a.username.toLowerCase().replace(/\s/g, "");
        this.state.user.displayName = a.username.toLowerCase();
        this.args = a;
    }

    public makeCredential() {
        // hideErrorAlert();
        console.log("Fetching options for new credential");
        getData("/makeCredential/" + this.state.user.name, {
            attType: this.args.attestation_type,
            authType: this.args.authenticator_attachment
        }).then((makeCredentialOptions) => {
            makeCredentialOptions.publicKey.challenge = this.bufferDecode(makeCredentialOptions.publicKey.challenge);
            makeCredentialOptions.publicKey.user.id = this.bufferDecode(makeCredentialOptions.publicKey.user.id);
            if (makeCredentialOptions.publicKey.excludeCredentials) {
                makeCredentialOptions.publicKey.excludeCredentials.forEach((element: any) => {
                    element.id = this.bufferDecode(element.id);
                });
            }
            console.log("Credential Creation Options");
            console.log(makeCredentialOptions);
            navigator.credentials.create({
                publicKey: makeCredentialOptions.publicKey
            }).then((newCredential: any) => {
                console.log("PublicKeyCredential Created");
                console.log(newCredential);
                this.state.createResponse = newCredential;
                this.registerNewCredential(newCredential);
            }).catch((err: any) => {

                console.info(err);
            });
        });
    }

    // This should be used to verify the auth data with the server
    public registerNewCredential(newCredential: NewCredential) {
        // Move data into Arrays incase it is super long
        const attestationObject = new Uint8Array(newCredential.response.attestationObject);
        const clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
        const rawId = new Uint8Array(newCredential.rawId);

        postData("/makeCredential", JSON.stringify({
            id: newCredential.id,
            rawId: this.bufferEncode(rawId),
            type: newCredential.type,
            response: {
                attestationObject: this.bufferEncode(attestationObject),
                clientDataJSON: this.bufferEncode(clientDataJSON),
            },
        })
        ).then();
    }
    public checkUserExists() {
        getData("/user/" + this.state.user.name + "/exists", {})
            .then((response) => {
                return true;
            }).catch(() => {
                return false;
            });
    }

    public getCredentials() {
        getData("/credential/" + this.state.user.name, {})
            .then((response) => {
                console.log(response);
            });
    }
    public getAssertion() {

        getData("/user/" + this.state.user.name + "/exists", {}).then((response: any) => {
            console.log(response);
        }).then(() => {
            getData("/assertion/" + this.state.user.name, {})
                .then((makeAssertionOptions: { publicKey: PublicKey }) => {
                    console.log("Assertion Options:");
                    console.log(makeAssertionOptions);
                    makeAssertionOptions.publicKey.challenge =
                        this.bufferDecode(makeAssertionOptions.publicKey.challenge);
                    makeAssertionOptions.publicKey.allowCredentials.forEach((listItem: { id: any; }) => {
                        listItem.id = this.bufferDecode(listItem.id);
                    });
                    console.log(makeAssertionOptions);
                    navigator.credentials.get({
                        publicKey: makeAssertionOptions.publicKey
                    })
                        .then((credential: any) => {
                            console.log(credential);
                            this.verifyAssertion(credential);
                        }).catch((err: { name: any; message: any; }) => {
                            console.log(err.name);
                        });
                });
        })
            .catch();
    }

    public verifyAssertion(assertedCredential: AssertedCredential) {
        // Move data into Arrays incase it is super long
        console.log("calling verify");
        const authData = new Uint8Array(assertedCredential.response.authenticatorData);
        const clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
        const rawId = new Uint8Array(assertedCredential.rawId);
        const sig = new Uint8Array(assertedCredential.response.signature);
        const userHandle = new Uint8Array(assertedCredential.response.userHandle);
        postData("/assertion", JSON.stringify({
            id: assertedCredential.id,
            rawId: this.bufferEncode(rawId),
            type: assertedCredential.type,
            response: {
                authenticatorData: this.bufferEncode(authData),
                clientDataJSON: this.bufferEncode(clientDataJSON),
                signature: this.bufferEncode(sig),
                userHandle: this.bufferEncode(userHandle),
            },
        })).then((response) => { console.log(response); });

    }

    public setCurrentUser(userResponse: any) {
        this.state.user.name = userResponse.name;
        this.state.user.displayName = userResponse.display_name;
    }

    public detectWebAuthnSupport() {
        if (window.PublicKeyCredential === undefined ||
            typeof window.PublicKeyCredential !== "function") {

            let errorMessage = "Oh no! This browser doesn't currently support WebAuthn.";
            if (window.location.protocol === "http:" &&
               (window.location.hostname !== "localhost" &&
                window.location.hostname !== "127.0.0.1")) {
                errorMessage = "WebAuthn only supports secure connections. ";
            }

            return;
        }
    }
    public bufferDecode(value: string) {
        return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
    }

    public buffer2string(buf: Uint8Array) {
        let str = "";
        if (!(buf.constructor === Uint8Array)) {
            buf = new Uint8Array(buf);
        }
        buf.map( (x: number) => {
            str += String.fromCharCode(x);
            return x;
        });
        return str;
    }
    public string2buffer(str: string) {
        return (new Uint8Array(str.length)).map((x, i) => {
            return str.charCodeAt(i);
        });
    }

    // Encode an ArrayBuffer into a base64 string.
    public bufferEncode(value: Uint8Array) {
        const base64js = require("js-base64").Base64;
        return base64js.fromByteArray(value)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    }

}

