import Apartment from '../models/apartment.model.js';

// @desc    Create new apartment
// @route   POST /api/apartments
// @access  Private (only for verified owners)
export const createApartment = async (req, res) => {
  try {
    const apartment = new Apartment({
      ...req.body,
      owner: req.user._id,
    });

    const saved = await apartment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create apartment', error: err.message });
  }
};

// @desc    Get all apartments
// @route   GET /api/apartments
// @access  Public
export const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate('owner', 'name email');
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apartments', error: err.message });
  }
};

// @desc    Get single apartment by ID
// @route   GET /api/apartments/:id
// @access  Public
export const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate('owner', 'name email');
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apartment', error: err.message });
  }
};

// @desc    Delete apartment
// @route   DELETE /api/apartments/:id
// @access  Private (only owner)
export const deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

    if (apartment.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this apartment' });
    }

    await apartment.remove();
    res.json({ message: 'Apartment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete apartment', error: err.message });
  }
};
export const getMyApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find({ owner: req.user._id });
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your apartments', error: err.message });
  }
};
export const verifyApartmentStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Verified", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    apartment.verificationStatus = status;
    await apartment.save();

    res.json({ message: `Apartment ${status.toLowerCase()} successfully`, apartment });
  } catch (err) {
    res.status(500).json({ message: "Failed to verify apartment", error: err.message });
  }
};
