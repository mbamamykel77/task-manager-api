const notFound = (req, res) => res.status(404).send({status: "failed", message:"route not found"});

export{notFound}