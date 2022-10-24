import { UserController } from "../app/http/controllers/UserController.js";
import { UserPolicy } from "../app/http/policies/userPolicy.js";
import { resource } from "./resource.js";

const router = resource(UserController, UserPolicy);

export default router;