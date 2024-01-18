export const loginUser = async (req, res, next) => {
    res['successfullPost'](req.user);
};

  
export const getCurrentSessionUser = async (req, res, next) => {
    res['successfullGet'](req.user);
};
  
export const logoutUser = async (req, res, next) => {
    res['successfullDelete']();
};