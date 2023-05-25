const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        through: ProductTag,
        as: ["product_id"]
      },
    ],
  })
    .then((tagData) => {
      res.status(200).json(tagData);
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } })
    .then((tagData) => {
      res.status(200).json(tagData);
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}})
    .then((tagData) => {
      res.status(200).json(tagData);
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
