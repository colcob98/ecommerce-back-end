const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    res.json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const postCategory = await Category.create(req.body);
    res.status(200).json(postCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const putCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(putCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
