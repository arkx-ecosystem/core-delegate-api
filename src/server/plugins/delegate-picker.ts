import Boom from "boom";
import { delegateRepository } from "../../repositories/delegate";

export const plugin = {
	name: "core-delegate-picker",
	version: "0.1.0",
	register(server) {
		server.ext({
			type: "onPreAuth",
			async method(request, h) {
				const delegate = delegateRepository.findById(request.params.delegate);

				if (!delegate) {
					return Boom.notFound();
				}

				request.app.delegate = delegate;

				return h.continue;
			},
		});
	},
};
