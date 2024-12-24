import Novel from "../models/Novel.js"
import novelSchema from "../validations/novelValid.js";
import fs from "fs";
import User from "../models/users.js";
import History from "../models/history.js";
import Genre from "../models/genres.js";
import { error } from "console";

export const get = async (req, res) => {
  try {
    const novel = await Novel.find();
    if (novel.length === 0) {
      return res.status(400).json({
        message: " khong ton tai tieu thuyet nao!",
      });
    }
    return res.status(200).json({
      message: " Tim thanh cong bo tieu thuyet",
      datas: novel,
    });
  } catch (error) {
    return res.status(500).json({
      message: "loi sever",
      error: error.message,
    });
  }
};

export const getNovel = async (req, res) => {
  try {
    let novel = await Novel.findOne({ _id: req.params.id });
    if (!novel) {
      return res.status(400).json({
        message: " khong ton tai bo tieu thuyet nao!",
      });
    }

    return res.status(200).json({
      message: " Tim thanh cong bo tieu thuyet",
      datas: novel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "loi sever",
    });
  }
};

//fixed
export const getDetail = async (req, res) => {
  try {
    let novel = await Novel.findOne({ _id: req.params.id });
    if (!novel) {
      return res.status(400).json({
        message: " khong torrn tai bo novel nao!",
      });
    }

    await novel.populate("genres");

    const currentView = novel.viewed;

    await Novel.updateOne(
      { _id: novel._id },
      { $set: { viewed: currentView + 1 } }
    );

    return res.status(200).json({
      message: " Tim thanh cong bo tieu thuyet",
      datas: novel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "loi sever",
    });
  }
};

export const getNovelByGenresId = async (req, res) => {
  try {
    const { genreId } = req.body;
    let novels = await Novel.find();

    novels = novels.filter((novel) => {
      if (novel.genres.includes(genreId)) {
        return novel;
      }
    });

    const genre = await Genre.findOne({ _id: genreId });

    return res.status(200).json({ novelList: novels, genreName: genre.name });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const create = async (req, res) => {
  let novelData = JSON.parse(req.body.novel);
  novelData.releaseDate = Date.now();
  
  try {
    const fileBuffer = fs.readFileSync(req.file.path);

    const blob = new Blob([fileBuffer], { type: req.file.mimetype });

    const formData = new FormData();
    formData.append("file", blob, req.file.filename);

    const response = await fetch("http://localhost:8090/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    novelData.poster_img = data;
    const { error } = novelSchema.validate(novelData);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        datas: [],
      });
    }

    const novels = await Novel.create(novelData);
    if (!novels) {
      return res.status(400).json({
        message: " them khong thanh cong!",
      });
    }

    fs.unlinkSync(req.file.path);
    return res.status(200).json({
      message: " Them thanh cong bo tieu thuyet",
      datas: novels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "loi sever",
    });
  }
};



export const update = async (req, res) => {
  try {
    const { id } = req.params;
    let novelData = req.body.novel ? JSON.parse(req.body.novel) : {};

    if (req.file) {
      // Đọc tệp mới từ hệ thống tập tin
      const fileBuffer = fs.readFileSync(req.file.path);
      const blob = new Blob([fileBuffer], { type: req.file.mimetype });
      const formData = new FormData();
      formData.append("file", blob, req.file.filename);

      // Tải tệp mới lên
      const response = await fetch("http://localhost:8090/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      novelData.poster_img = data;

      // Loại bỏ tệp cũ nếu một tệp mới được tải lên
      const existingNovel = await Novel.findById(id);
      if (existingNovel && existingNovel.poster_img) {
        const oldFilePath = `/path/to/uploaded/files/${existingNovel.poster_img.filename}`;
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Xóa tệp vừa được tải lên từ vị trí tạm thời
      fs.unlinkSync(req.file.path);
    }



    // Cập nhật tài liệu tieu thuyet trong cơ sở dữ liệu
    const updatedNovel = await Novel.findByIdAndUpdate(id, novelData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNovel) {
      return res.status(400).json({
        message: "Cập nhật không thành công!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thành công bộ tieu thuyet",
      datas: updatedNovel,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật tieu thuyet:", error);
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};


export const remove = async (req, res) => {
  try {
    const novels = await Novel.findByIdAndDelete(req.params.id);
    if (!novels) {
      return res.status(400).json({
        message: "Xoa khong thanh cong!",
      });
    }
    return res.status(200).json({
      message: " Xoa thanh cong bo tieu thuyet",
      datas: novels,
    });
  } catch (error) {
    return res.status(500).json({
      message: "loi sever",
    });
  }
};

export const followNovel = async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    const novel = await Novel.findOne({ _id: movieId });
    if (!user) {
      return res.status(404).json({ error: " khong tim thay user" });
    }
    if (!novel) {
      return res.status(404).json({ error: " khong tim thay novel" });
    }
    const isFollowed = user.favorite.includes(movieId);
    if (isFollowed) {
      user.favorite = user.favorite.filter((id) => id.toString() !== movieId);
      await user.save();
      return res.status(200).json(user);
    } else {
      user.favorite.push(movieId);
      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getFollowNovelOfUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).json({ error: "Khong tim thay" });
  }
  const novels = await user.populate("favorite");
  return res.status(200).json(novels.favorite);
};

export const markEpisodeWatching = async (req, res) => {
  const { episodeId, time } = req.body;
  let history = await History.findOne({ episodeId: episodeId });
  if (!history) {
    history = new History({
      userId: req.user._id,
      episodeId: episodeId,
      timeWatchMovie: time,
    });
    await history.save();
    return res.status(200).json(history);
  }

  history.timeWatchMovie = time;
  await history.save();
};

export const getNovelByGenres = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ message: "Không tìm thấy thể loại này" });
    }

    const novels = await Novel.find({ genres: genre._id });

    if (novels.length === 0) {
      return res
        .status(400)
        .json({ message: "Không tồn tại tieu thuyet nào thuộc thể loại này" });
    }

    return res
      .status(200)
      .json({ message: "Tìm thành công tieu thuyet", datas: novels });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const searchNovel = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Search for novels with names that contain the search term (case-insensitive)
    const novels = await Novel.find({ name: new RegExp(name, "i") });

    res.status(200).json(novels);
  } catch (error) {
    console.error("Error searching novels:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching for novels" });
  }
};

export const ratingNovel = async (req, res) => {
  try {
    const { star, movieId } = req.body;
    const userId = req.user._id;
    const novel = await Novel.findById(movieId);

    // Tìm user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm phần tử trong mảng rating có movieId trùng với req.body.movieId
    const ratingIndex = user.rating.findIndex(
      (rating) => rating.movie.toString() === movieId
    );

    if (ratingIndex === -1) {
      const rate = {
        movie: movieId,
        rate: star,
      };
      user.rating.push(rate);
      await user.save();
      novel.totalPoints += star;
      novel.countRating += 1;
      await novel.save();

      return res.status(201).json(rate);
    }

    const oldRate = user.rating[ratingIndex].rate;
    user.rating[ratingIndex].rate = star;

    novel.totalPoints = novel.totalPoints - oldRate + star;
    // Cập nhật rate của phần tử đóar;

    // Lưu đối tượng user sau khi đã cập nhật
    await user.save();
    await novel.save();

    // Trả về thông tin user sau khi cập nhật
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRateOfUser = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const ratingIndex = user.rating.findIndex(
      (rating) => rating.movie.toString() === movieId
    );

    if (ratingIndex === -1) {
      return res.status(404).json({ error: "novel chua duoc danh gia" });
    }
    return res.status(200).json(user.rating[ratingIndex].rate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};