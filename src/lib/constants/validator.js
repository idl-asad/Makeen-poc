'use strict'

const LOGIN = {
    properties: {
        username: {
            type: 'string',
            required: true,
            messages: {
                type: 'username is not a string',
                required: 'username is required'
            }
        },
        password: {
            type: 'string',
            required: true,
            messages: {
                type: 'password is not a string',
                required: 'password is required'
            }
        }
    }
};

const REGISTER = {
    properties: {
        username: {
            type: 'string',
            required: true,
            messages: {
                type: 'username is not a string',
                required: 'username is required'
            }
        },
        email: {
            type: 'string',
            format: 'email',
            required: true,
            messages: {
                type: 'email is not a string',
                required: 'email is required',
                format: 'Invalid email format'
            }
        },
        password: {
            type: 'string',
            required: true,
            messages: {
                type: 'password is not a string',
                required: 'password is required'
            }
        },
        firstName: {
            type: 'string',
            required: true,
            messages: {
                type: 'firstName is not a string',
                required: 'firstName is required'
            }
        },
        lastName: {
            type: 'string',
            required: true,
            messages: {
                type: 'lastName is not a string',
                required: 'lastName is required'
            }
        }
    }
};

const UPDATE_USER = {
    properties: {
        username: {
            type: 'string',
            required: false,
            messages: {
                type: 'username is not a string',
                required: 'username is required'
            }
        },
        email: {
            type: 'string',
            format: 'email',
            required: false,
            messages: {
                type: 'email is not a string',
                required: 'email is required',
                format: 'Invalid email format'
            }
        },
        password: {
            type: 'string',
            required: false,
            messages: {
                type: 'password is not a string',
                required: 'password is required'
            }
        },
        firstName: {
            type: 'string',
            required: false,
            messages: {
                type: 'firstName is not a string',
                required: 'firstName is required'
            }
        },
        lastName: {
            type: 'string',
            required: false,
            messages: {
                type: 'lastName is not a string',
                required: 'lastName is required'
            }
        }
    }
};

const CREATE_GROUP = {
    properties: {
        name: {
            type: 'string',
            required: true,
            messages: {
                type: 'name is not a string',
                required: 'name is required'
            }
        }
    }
}

const CREATE_COLLECTION = {
    properties: {
        name: {
            type: 'string',
            required: true,
            messages: {
                type: 'name is not a string',
                required: 'name is required'
            }
        },
        groupId: {
            type: 'string',
            required: true,
            messages: {
                type: 'groupId is not a string',
                required: 'groupId is required'
            }
        }
    }
}

const CREATE_GROUP_ROLE = {
    properties: {
        groupId: {
            type: 'string',
            required: false,
            messages: {
                type: 'groupId is not a string',
                required: 'groupdId is required'
            }
        },
        userId: {
            type: 'string',
            required: true,
            messages: {
                type: 'userId is not a string',
                required: 'userId is required'
            }
        },
        role: {
            type: 'string',
            required: true,
            enum: ['globalManager', 'manager', 'regular'],
            messages: {
                type: 'role is not a string',
                required: 'role is required'
            }
        },
        
    }
}

const CREATE_ITEM = {
    properties: {
        parentId: {
            type: 'string',
            required: false,
            messages: {
                type: 'parentId is not a string',
                required: 'parentId is required'
            }
        },
        name: {
            type: 'string',
            required: true,
            messages: {
                type: 'userId is not a string',
                required: 'userId is required'
            }
        }     
    }
}


const roles = {
    type: 'array',
    required: false,
    minItems: 1,
    messages: {
        type: 'roles is not an array',
    },
    items: {
        type: 'object',
        properties: {
            role: {
                type: 'string',
                required: true,
                enum: ['globalManager', 'manager', 'regular']
            },
            groupId: {
                type: 'string',
                required: true
            },
            userId: {
                type: 'string',
                required: true
            }
        }
    }        
}

module.exports = {
    LOGIN,
    REGISTER,
    UPDATE_USER,
    CREATE_GROUP,
    CREATE_GROUP_ROLE,
    CREATE_COLLECTION,
    CREATE_ITEM
}