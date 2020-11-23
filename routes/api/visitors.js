const express = require("express");
const router = express.Router();
const Visitor = require("../../models/Visitors");
router.post("/", async (req, res) => {
  try {
    let filterObj = {};
    if (req.body.hostname && req.body.hostname.length) {
      filterObj.hostname = { $in: req.body.hostname };
    }

    if (req.body.datetime) {
      let datetime = req.body.datetime.split(" - ");
      filterObj.createdAt = {
        $gte: datetime[0],
        $lte: datetime[1],
      };
    }

    let visitors = await Visitor.find(filterObj);
    res.json({
      success: true,
      response: visitors,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/hostnames", async (req, res) => {
  try {
    let hosts = await Visitor.distinct("hostname");
    res.json({
      success: true,
      response: hosts,
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = router;
