import { StatusCode } from "hono/utils/http-status";

export class NotFoundError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class ValidationError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "ValidationError";
	}
}

export class ForbiddenError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "ForbiddenError";
	}
}

export class TooManyRequestError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "TooManyRequestError";
	}
}

export const getStatus = (e: unknown): StatusCode => {
	let status: StatusCode = 500;

	if (e instanceof NotFoundError) {
		status = 404;
	} else if (e instanceof ValidationError) {
		status = 422;
	} else if (e instanceof ForbiddenError) {
		status = 403;
	} else if (e instanceof TooManyRequestError) {
		status = 429;
	}

	return status;
};
