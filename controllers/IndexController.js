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

const test = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog - TEST.',
      user: req.user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
	index,
  test
};