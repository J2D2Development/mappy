import { POINTS } from './points';

export const USERS = [
	{ 
		"id": 1, "username": "driscollj", "password": "testsitepassword", 
        "first_name": "Joe", "last_name": "Driscoll", 
        "homePoint": 1,
		"points": [1, 3]
	},
	{ 
		"id": 2, "username": "treehornj", "password": "testsitepassword", 
        "first_name": "Jackie", "last_name": "Treehorn", 
        "homePoint": 2,
		"points": [2, 4]
	}
];

//we want functions to get home point info, find points within certain radius of homepoint (miles?)

export function getPoint(uid) {
    return POINTS.find(p => p.id === uid);
}

export function getPoints(uid) {
    const user = USERS.find(u => u.id === uid);
    return user.points.map(myPoint => {
        return POINTS.find(p => p.id === myPoint);
    });
}