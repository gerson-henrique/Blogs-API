 const { Category, BlogPost } = require('../../models');

const validatePostBody = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({
        message: 'Some required fields are missing',
       }); 
   }
   next();
};

const idCategoryCheck = async (req, res, next) => {
  const { categoryIds } = req.body;
  const all = await Category.findAll({ where: { id: categoryIds } });
  if (!all.length) return res.status(400).json({ message: '"categoryIds" not found' });
   next();
  };

  const userHavePost = async (req, res, next) => {
    const { id } = req.params;
    const userID = req.user.id;
    const post = await BlogPost.findByPk(id);
    if (post.dataValues.userId !== userID) {
 return res.status(401).json({
      message: 'Unauthorized user',
    }); 
}
     next();
    };

module.exports = {
  validatePostBody,
  idCategoryCheck,
  userHavePost,
};