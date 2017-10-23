"use strict";

let Routes = class {
	constructor(router) {
		////////////
		// Public Routes
		////////////

		//router.use(authMiddleware);

		////////////
		// Private Routes (require auth)
		////////////


		this.router = router;
	}
};

module.exports = Routes;