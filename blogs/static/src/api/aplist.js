import Request from './request';

export const adminLogin = (data) => Request.post('/api/admin/login',data);
export const adminRegister = (data) => Request.post('/api/admin/register',data);

export const allArticle = (data) => Request.post('/api/article/home',data);
export const publishArticle = (data) => Request.post('/api/article/publish',data);
export const categoryArticle = (data) => Request.post('/api/article/category',data);
export const dateArticle = (data) => Request.get('/api/article/date',data);
export const viewArticle = (data) => Request.post('/api/article/viewArticle',data);
export const deleteArticle = (data) => Request.post('/api/article/deleteArticle',data);
//查找需要编辑的文章
export const editArticle = (data) => Request.post('/api/article/editArticle',data);
//编辑完成后的文章
export const publishEditArticle = (data) => Request.post('/api/article/publishEditArticle',data);

//用户查看

//首页推荐
export const recommended = () => Request.get('/api/user/recommendedArticle');
export const category = (data) => Request.post('/api/user/category',data);
export const userViewArticle = (data) => Request.post('/api/user/view',data);
export const submitComment = (data) => Request.post('/api/user/comment',data);
export const giveLikes = (data) => Request.post('/api/user/giveLikes',data);
export const addHeart = (data) => Request.post('/api/user/addHeart',data);