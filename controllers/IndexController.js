const index = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
	index
};