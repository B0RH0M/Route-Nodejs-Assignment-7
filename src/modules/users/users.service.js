import { userModel } from "../../db/associations.js";
// I change the response structure :)

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json({ message: "users retrieved successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json({ message: "user added successfully", data: newUser }); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const [updatedRowsCount, updatedRows] = await userModel.update(updateData, {
      where: { id: userId },
      returning: true, // to get the updated row(s)
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user updated successfully", data: updatedRows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getUserByEmail = async (req, res) => {
  const email = req.query.email;

  try {
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      res.status(200).json({ message: "user retrieved successfully", data: user });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findByPk(userId);
    if (user) {
      res.status(200).json({ message: "user retrieved successfully", data: user });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedRowsCount = await userModel.destroy({ where: { id: userId } });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}