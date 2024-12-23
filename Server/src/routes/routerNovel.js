import express from "express";
import {
  get,
  create,
  getDetail,
  update,
  remove,
  getNovel,
  followNovel,
  getFollowNovelOfUser,
  markEpisodeWatching,
  getNovelByGenres,
  getNovelByGenresId,
  searchNovel,
  ratingNovel,
  getRateOfUser,
} from "../controllers/NovelController.js";
import upload from "../configs/multerConfig.js";
import protectRoute from "../../until/decodeToken.js";
import isAdmin from "../../until/checkIsAdmin.js";

const routerNovel = express.Router();

routerNovel.get("/", get);
// routerNovel.post("/update/:id", protectRoute, isAdmin,upload.single("poster"), update);
// routerNovel.delete("/:id", protectRoute, isAdmin, remove);
// routerNovel.post("/create", protectRoute, isAdmin, upload.single("poster"), create);

routerNovel.post("/update/:id",upload.single("poster"), update);
routerNovel.delete("/:id", remove);
routerNovel.post("/create", upload.single("poster"), create);

routerNovel.get("/get-detail/:id", getDetail);
routerNovel.get("/get/:id", getNovel);
routerNovel.post("/follow", protectRoute, followNovel);
routerNovel.get("/list-favorite", protectRoute, getFollowNovelOfUser);
routerNovel.post("/watching-history", protectRoute, markEpisodeWatching);
routerNovel.get("/findNovel/:id",  getNovelByGenres);
routerNovel.post("/get-novel-by-genre", getNovelByGenresId);
routerNovel.post("/search-novel",  searchNovel);
routerNovel.post("/rating", protectRoute, ratingNovel);
routerNovel.post("/getRate", protectRoute, getRateOfUser);
export default routerNovel;
