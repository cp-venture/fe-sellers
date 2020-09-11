import passportMiddleware from "../fe-prod/src/reaction/apiUtils/passportMiddleware";

const postLogoutCallback = async (req, res) => {
  const redirectTo = (req.session.redirectTo === "/") ? "/profile" : req.session.redirectTo;
  res.redirect(redirectTo || "/");
};

export default passportMiddleware(postLogoutCallback);
