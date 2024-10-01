const express = require("express");
const { CustomerModel, validateCustomer } = require("../model/customer.model");
const router = express.Router();

router.get("/customer", async (req, res) => {
  const customers = await CustomerModel.find();
  res.status(200).send(customers);
});

router.get("/customer/:id", async (req, res) => {
  try {
    const customer = await CustomerModel.findById({ _id: req.params.id });

    if (!customer) throw new Error();

    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send("Not found...");
  }
});

router.post("/customer", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(403).send(error);

  const customer = new CustomerModel({
    ...req.body,
  });

  const result = await customer.save();
  res.status(201).send(result);
});

router.put("/customer/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(403).send(error);

  try {
    const customer = await CustomerModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!customer) throw new Error();

    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send("Not found...");
  }
});

router.delete("/customer/:id", async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!customer) throw new Error();

    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send("Not found...");
  }
});

module.exports = router;
