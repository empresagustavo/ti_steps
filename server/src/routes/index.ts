import authRoute from "./maps/authMap.router";
import navMainRoute from "./maps/navMainMap.router";
import notificationRoute from "./maps/notification.router";
import notificationContentRoute from "./maps/notificationContent.router";
import snackRoute from "./maps/snack.router";
import triggerRoute from "./maps/trigger.router";
import userRoute from "./maps/userMap.router";



// Rotas
const routes = [
    authRoute,
    userRoute,
    navMainRoute,
    triggerRoute,
    notificationRoute,
    notificationContentRoute,
    snackRoute,
];


export default routes;
