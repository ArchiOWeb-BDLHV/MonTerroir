import createDebugger from "debug";
import Productor from "../../models/productor.js";

const debug = createDebugger('express-api:productors')

export class ProductorController {

    static async index(req, res, next) {

        //if query string contains a location, filter by location
        let productors;
        if (req.query.location) {
            productors = await Productor.aggregate([{
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: req.query.location.split(',').map(Number)
                        },
                        distanceField: "distance",
                        spherical: true,

                        maxDistance: (parseInt(req.query.distance) || 100)
                    },

                },
                {
                    $lookup: {
                        from: "images",
                        localField: "_id",
                    }
                }
            ]);
        } else {
            productors = await Productor.find().sort('name').populate('images');
        }

        //hide properties from response
        productors = productors.map(productor => {
            delete productor.password;
            delete productor.__v;
            delete productor.role;
            delete productor.conversations;
            delete productor.updatedAt;
            return productor;
        });

        res.status(200).json(productors);
    }

    static async store(req, res, next) {
        const user = new Productor({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            location: req.body.location
        });
        const result = await user.save();
        res.status(201).json(result);
    }

    static async show(req, res, next) {
        const user = await Productor.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Productor not found' });
        }
        res.status(200).json(user);
    }

    static async update(req, res, next) {
        const user = await Productor.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(user);
    }


    static async destroy(req, res, next) {
        const user = await Productor.findOneAndDelete({ _id: req.params.id });
        res.status(204).json();
    }
}