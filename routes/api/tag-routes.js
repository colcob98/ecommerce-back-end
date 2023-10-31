const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag
        }],
    });
    console.log(tags);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const postTag = await Tag.create(req.body);
    res.status(200).json(postTag);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const putTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(putTag);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
