export class Policy {

    errorResponse(response, code) {
        message = "";
        switch (code) {
            case 403:
                message = "Forbidden";
                break;
            case 404:
                message = "Not found";
                break;
            case 500:
                message = "Internal server error";
                break;
            default:
                message = "Unknown error";

        }
        response.status(code).json({ message });
    }
}