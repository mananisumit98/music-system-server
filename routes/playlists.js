const router = require("express").Router();
const Auth = require("../Auth/auth");
const { newPlaylist, updatePlaylist, getPlaylistsById, deletePlaylist } = require("../controllers/playlists");

router.get("/all/:id", [Auth], getPlaylistsById);
router.post("/create", [Auth], newPlaylist);
router.patch("/update", [Auth], updatePlaylist);
router.delete("/delete/:id", [Auth], deletePlaylist);

module.exports = router;