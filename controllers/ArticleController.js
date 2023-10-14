const index = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Article.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const show = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Article.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const create = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Article.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const update = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Article.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const destroy = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Article.'
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
      message: 'Article.'
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
      message: 'Article.'
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
      message: 'Article.'
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
  show,
  create,
  update,
  destroy,
  comment,
  like,
  unlike
};