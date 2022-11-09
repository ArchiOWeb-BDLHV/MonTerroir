load_search_index({"pages":[{"title":"Mon Terroir - Tess\u00e8ve","text":"Table of Contents Welcome #Welcome This API is a school project. It is not intended for production use.","tags":"","url":"index.html"},{"title":"Register","text":"Table of Contents Request Body Responses Errors #Request POST \/api\/auth\/register #Body { \"username\": \"jonh.doe\", \"password\": \"password\" } #Responses 200 : Ok { \"user\": { \"username\": \"joe\", \"_id\": \"123456\" }, \"accessToken\": \"123456787654321\" }, #Errors 401 : Not authorized { \"message\": \"Unauthenticated\" } 422 : Unprocessable Entity { \"message\": \"Username and password are required\" }","tags":"","url":"en\/Authentification\/Register.html"},{"title":"Login","text":"Table of Contents Request Body Responses Errors #Request POST \/api\/auth\/login #Body { \"username\": \"jonh.doe\", \"password\": \"password\" } #Responses 200 : Ok { \"user\": { \"username\": \"joe\", \"_id\": \"123456\" }, \"accessToken\": \"123456787654321\" }, #Errors 401 : Not authorized { \"message\": \"Username or password incorrect\" } 422 : Unprocessable Entity { \"message\": \"Username and password are required\" }","tags":"","url":"en\/Authentification\/Login.html"},{"title":"Getting Started","text":"To be authenticated, get the access token by registering. Then add this token as Authorization: Bearer {token}","tags":"","url":"en\/Getting_Started.html"},{"title":"List all conversations","text":"Table of Contents Request Responses Errors #Request GET \/api\/conversations\/ #Responses 200 : OK [ { \"_id\": \"123456\", \"name\": \"test\", \"users\": [\"987654321\"], \"messages\": [], \"__v\": 0 } ] #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" }","tags":"","url":"en\/Conversations\/List_all_conversations.html"},{"title":"Create a conversation","text":"Table of Contents Request Body Responses Errors #Request POST \/api\/conversations\/ #Body { \"name\": \"NAME\", \"users\": [\"USER_ID\"] } #Responses 201 : Created { \"name\": \"NAME\", \"users\": [\"USER_ID\"], \"_id\": \"2345678\", \"__v\": 0 }, #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" } 422 : Unprocessable Entity { \"message\": \"Message validation failed: content: Path `name` is required.\" }","tags":"","url":"en\/Conversations\/Create_a_conversation.html"},{"title":"List all messages","text":"Table of Contents Request Responses Errors #Request GET \/api\/conversations\/:id\/messages #Responses 200 : OK [ { \"_id\": \"123456\", \"content\": \"message\", \"conversation\": \"2345678\", \"date\": \"2022-11-07T07:47:42.309Z\", \"__v\": 0 } ] #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" }","tags":"","url":"en\/Messages\/List_all_messages.html"},{"title":"Create a message","text":"Table of Contents Request Body Responses Errors #Request POST \/api\/conversations\/:id\/messages #Body { \"content\": \"MESSAGE\" } #Responses 201 : Created { \"content\": \"test\", \"conversation\": \"123456\", \"_id\": \"2345678\", \"date\": \"YYYY-MM-DDTH:I:S.943Z\", \"__v\": 0 }, #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" } 422 : Unprocessable Entity { \"message\": \"Message validation failed: content: Path `content` is required.\" }","tags":"","url":"en\/Messages\/Create_a_message.html"},{"title":"List all products","text":"Table of Contents Request Responses Errors #Request GET \/api\/products\/ #Responses 200 : OK [ { \"name\": \"Miel\", \"description\": \"Miel de fleure\", \"price\": 8.5, \"category\": \"miel\", \"image_url\": \"https:\/\/monImage.jpg\" }, { \"name\": \"Fromage\", \"description\": \"Tome vaudoise\", \"price\": 3.5, \"category\": \"laiterie\", \"image_url\": \"https:\/\/monImageLait.jpg\" } ] #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"en\/Products\/List_all_products.html"},{"title":"List all users","text":"Table of Contents Request Responses Errors #Request GET \/api\/users\/ #Responses 200 : OK [ { \"_id\": 123, \"name\": \"John Doe\" }, { \"_id\": 345, \"name\": \"Jane Doe\" } ] #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"en\/Users\/List_all_users.html"},{"title":"Get one user","text":"Table of Contents Request Response Errors #Request GET \/api\/users\/:id #Response 200 : OK { \"_id\": 123, \"name\": \"John Doe\" }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"en\/Users\/Get_one_user.html"},{"title":"Create a user","text":"Table of Contents Request Body Responses Errors #Request POST \/api\/users\/ #Body { \"name\": \"NAME\" } #Responses 201 : Created { \"_id\": 123, \"name\": \"John Doe\" }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"en\/Users\/Create_a_user.html"},{"title":"Update a user","text":"Table of Contents Request Body Responses Errors #Request PUT \/api\/users\/:id #Body { \"name\": \"NAME\" } #Responses 200 : OK { \"_id\": 123, \"name\": \"John Doe\" }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"en\/Users\/Update_a_user.html"},{"title":"Delete a user","text":"Table of Contents Request Responses Errors #Request DELETE \/api\/users\/:id #Responses 204 : No content { }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"en\/Users\/Delete_a_user.html"},{"title":"Connexion","text":"Table of Contents Request of a connection Headers Messages Codes #Request of a connection wss:\/\/mon-terroir.onrender.com #Headers { \"Authorization\": \"Bearer &lt;token&gt;\" } #Messages { \"data\": { \"message\": \"MESSAGE\", \"conversation\": { \"id\": \"123456\", \"name\": \"Conversation name\" }, \"sender\": { \"id\": \"123456\", \"username\": \"Username\" }, \"date\": \"2021-01-01T00:00:00.000Z\" }, \"code\": \"CODE\" } #Codes - NEW_MESSAGE - NEW_CONVERSATION","tags":"","url":"en\/Notification_en_direct\/Connexion.html"},{"title":"Commencer","text":"Table of Contents Commencer Connexion #Commencer #Connexion Pour utiliser cette API vous devez vous connecter. Plus d\u2019informations sur la connexion sont disponibles dans la section Connexion. Vous devez fournir un header Authorization avec votre token d\u2019authentification. Authorization: Bearer {token}","tags":"","url":"fr\/Commencer.html"},{"title":"Enregistrement","text":"Table des mati\u00e8res Request Body Responses Errors #Request POST \/api\/auth\/register #Body { \"username\": \"jonh.doe\", \"password\": \"password\" } #Responses 200 : Ok { \"user\": { \"username\": \"joe\", \"_id\": \"123456\" }, \"accessToken\": \"123456787654321\" }, #Errors 401 : Not authorized { \"message\": \"Unauthenticated\" } 422 : Unprocessable Entity { \"message\": \"Username and password are required\" }","tags":"","url":"fr\/Connexion\/Enregistrement.html"},{"title":"Connexion","text":"Table des mati\u00e8res Request Body Responses Errors #Request POST \/api\/auth\/login #Body { \"username\": \"jonh.doe\", \"password\": \"password\" } #Responses 200 : Ok { \"user\": { \"username\": \"joe\", \"_id\": \"123456\" }, \"accessToken\": \"123456787654321\" }, #Errors 401 : Not authorized { \"message\": \"Username or password incorrect\" } 422 : Unprocessable Entity { \"message\": \"Username and password are required\" }","tags":"","url":"fr\/Connexion\/Connexion.html"},{"title":"Lister toutes les conversations","text":"Table des mati\u00e8res Request Responses Errors #Request GET \/api\/conversations\/ #Responses 200 : OK [ { \"_id\": \"123456\", \"name\": \"test\", \"users\": [\"987654321\"], \"messages\": [], \"__v\": 0 } ] #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" }","tags":"","url":"fr\/Conversations\/Lister_toutes_les_conversations.html"},{"title":"Cr\u00e9er une conversation","text":"Table des mati\u00e8res Request Body Responses Errors #Request POST \/api\/conversations\/ #Body { \"name\": \"NAME\", \"users\": [\"USER_ID\"] } #Responses 201 : Created { \"name\": \"NAME\", \"users\": [\"USER_ID\"], \"_id\": \"2345678\", \"__v\": 0 }, #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" } 422 : Unprocessable Entity { \"message\": \"Message validation failed: content: Path `name` is required.\" }","tags":"","url":"fr\/Conversations\/Creer_une_conversation.html"},{"title":"Lister tous les messages","text":"Table des mati\u00e8res Request Responses Errors #Request GET \/api\/conversations\/:id\/messages #Responses 200 : OK [ { \"_id\": \"123456\", \"content\": \"message\", \"conversation\": \"2345678\", \"date\": \"2022-11-07T07:47:42.309Z\", \"__v\": 0 } ] #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" }","tags":"","url":"fr\/Messages\/Lister_tous_les_messages.html"},{"title":"Cr\u00e9er un message","text":"Table des mati\u00e8res Request Body Responses Errors #Request POST \/api\/conversations\/:id\/messages #Body { \"content\": \"MESSAGE\" } #Responses 201 : Created { \"content\": \"test\", \"conversation\": \"123456\", \"_id\": \"2345678\", \"date\": \"YYYY-MM-DDTH:I:S.943Z\", \"__v\": 0 }, #Errors 401 : Not authorized { \"message\": \"Unauthorized. Please login.\" } 422 : Unprocessable Entity { \"message\": \"Message validation failed: content: Path `content` is required.\" }","tags":"","url":"fr\/Messages\/Creer_un_message.html"},{"title":"List all products","text":"Table des mati\u00e8res Request Responses Errors #Request GET \/api\/products\/ #Responses 200 : OK [ { \"name\": \"Miel\", \"description\": \"Miel de fleure\", \"price\": 8.5, \"category\": \"miel\", \"image_url\": \"https:\/\/monImage.jpg\" }, { \"name\": \"Fromage\", \"description\": \"Tome vaudoise\", \"price\": 3.5, \"category\": \"laiterie\", \"image_url\": \"https:\/\/monImageLait.jpg\" } ] #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"fr\/Produits\/List_all_products.html"},{"title":"List all users","text":"Table des mati\u00e8res Request Responses Errors #Request GET \/api\/users\/ #Responses 200 : OK [ { \"_id\": 123, \"name\": \"John Doe\" }, { \"_id\": 345, \"name\": \"Jane Doe\" } ] #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"fr\/Utilisateurs\/List_all_users.html"},{"title":"Get one user","text":"Table des mati\u00e8res Request Response Errors #Request GET \/api\/users\/:id #Response 200 : OK { \"_id\": 123, \"name\": \"John Doe\" }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"fr\/Utilisateurs\/Get_one_user.html"},{"title":"Create a user","text":"Table des mati\u00e8res Request Body Responses Errors #Request POST \/api\/users\/ #Body { \"name\": \"NAME\" } #Responses 201 : Created { \"_id\": 123, \"name\": \"John Doe\" }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"fr\/Utilisateurs\/Create_a_user.html"},{"title":"Update a user","text":"Table des mati\u00e8res Request Body Responses Errors #Request PUT \/api\/users\/:id #Body { \"name\": \"NAME\" } #Responses 200 : OK { \"_id\": 123, \"name\": \"John Doe\" }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"fr\/Utilisateurs\/Update_a_user.html"},{"title":"Delete a user","text":"Table des mati\u00e8res Request Responses Errors #Request DELETE \/api\/users\/:id #Responses 204 : No content { }, #Errors 401 : Not authorized { \"success\": false, \"message\": \"Unauthenticated\", \"data\": [] }","tags":"","url":"fr\/Utilisateurs\/Delete_a_user.html"},{"title":"Connexion","text":"Table des mati\u00e8res Requ\u00e8te de connexion Headers Messages Codes #Requ\u00e8te de connexion wss:\/\/mon-terroir.onrender.com #Headers { \"Authorization\": \"Bearer &lt;token&gt;\" } #Messages { \"data\": { \"message\": \"MESSAGE\", \"conversation\": { \"id\": \"123456\", \"name\": \"Conversation name\" }, \"sender\": { \"id\": \"123456\", \"username\": \"Username\" }, \"date\": \"2021-01-01T00:00:00.000Z\" }, \"code\": \"CODE\" } #Codes - NEW_MESSAGE - NEW_CONVERSATION","tags":"","url":"fr\/Notification_en_direct\/Connexion.html"}]});