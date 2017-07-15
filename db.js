let data = [];

const add = (name, rating) => {
	var id = data.reduce((memo, obj) => {
		if (obj.id)
		return memo < obj.id ? obj.id : memo
	}, 0) + 1;
	data.push({'id': id, 'name': name, 'rating': rating})
} 

const remove = (id) => {
	data = data.filter((product) => {
		return product.id !== id
	})
}

const list = () => data;

const find = (id) => {
	return data.filter( (product) => {
		return product.id === id 
	})[0]
};

const favorite = () => {
	return data.reduce((obj, product) => {
		return product.rating > obj.rating ? product : obj;
	}, {rating: -1});
};

const seed = () => {
	data = [];
	add('Thai Food', 8);
	add('Casual Chicken', 5);
	add('Open Market', 7);
};

seed();

module.exports = {add: add, list: list, find: find, favorite: favorite, seed: seed, remove: remove	};