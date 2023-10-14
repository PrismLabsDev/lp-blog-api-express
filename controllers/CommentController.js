const show = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Comment.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const comment = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Comment.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const like = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Comment.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const unlike = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Comment.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
  show,
  comment,
  like,
  unlike
};