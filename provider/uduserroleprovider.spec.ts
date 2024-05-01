import path from "path";
import { Verifier } from "@pact-foundation/pact";


const SERVER_URL = "http://localhost:4000";

describe("clients server verification", () => {
	it("Pact verification", () => {
		// eslint-disable-next-line no-console
		const options: any = {
			provider: "clients service",
			providerBaseUrl: SERVER_URL,
			pactUrls: [path.resolve(process.cwd(), "src/__tests__/helpers/uduserrole.json")],
			consumerVersionTags: ["consumer"],
			providerVerificationTags: ["provider"],
			providerVersion: "1.0.0",
			 publishVerificationResult: true
		};
		  // eslint-disable-next-line @typescript-eslint/no-shadow
		  return new Verifier(options).verifyProvider().then(Output =>{
			// eslint-disable-next-line no-console
			console.log("pact verification");
			// eslint-disable-next-line no-console
			console.log(Output);
		  });
	});
});

