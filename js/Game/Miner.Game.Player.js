var Miner = Miner || {};
Miner.Game = Miner.Game || {};
Miner.Game.Player = Miner.Game.Player || Class.extend({
    'init': function(o) {
        this.health = o.health || 100;
        this.light = o.light || 0;
        this.luck = o.luck || 0;
        this.money = {
            'platinum': o.platinum || 0,
            'gold': o.gold || 0,
            'silver': o.silver || 0,
            'cash': o.cash || 1500
        };
        this.activate = o.activate || null;
        this.inventory = o.inventory || {};
        this.inventory.items = o.inventory.items || [];
        
        return this;
    },
    
    'transact': function(o) {
        o = o || {};
        var type = o.type;
        var amount = o.amount;
        
        if (!type || !amount || !(type in this.money)) {
            throw new TypeError('Invalid transaction object');
        }
        
        this.money[type] += amount;
        return true;
    },
    
    'addItem': function(item) {
        if (typeof item !== 'MinerJs Inventory Item') {
            throw new TypeError('Invalid Item');
        }
        
        this.inventory.items.push(item);
        return true;
    },
    
    'removeItem': function(itemName) {
        var numItems = this._numInvItems();
        for (var i = 0; i < numItems; i++) {
            if (this.inventory.items[i].name === itemName) {
                return this.inventory.items.splice(i, 1); 
            }
        }
        return false;
    },
    
    'hasItem': function(itemName) {
        var numItems = this._numInvItems();
        for (var i = 0; i < numItems; i++) {
            if (this.inventory.items[i].name === itemName) {
                return true;
            }
        }
        return false;
    },
    
    'numItems': function(itemName) {
        var numItems = this._numInvItems();
        var count = 0;
        for (var i = 0; i < numItems; i++) {
            if (this.inventory.items[i].name === itemName) {
                count++;
            }
        }
        return count;
    },
    
    'injure': function(amount) {
        this.health -= amount || 10;
        if (this.health < 0) {
            return this._die();
        }
        return true;
    },
    
    'moveLeft': function() {
        var nextCell = this.game.grid.left(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveRight': function() {
        var nextCell = this.game.grid.right(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveUp': function() {
        var nextCell = this.game.grid.above(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           this._changePosition(nextCell); 
        }
        return false;
    },
    
    'moveDown': function() {
        var nextCell = this.game.grid.below(this.position.cell);
        if (nextCell && nextCell.enter(this)) {
           return this._changePosition(nextCell); 
        }
        return false;
    },
    
    '_changePosition': function(cell) {
        this.position.cell = cell;
        return true;
    },
    
    '_die': function() {
        return true;
    },

    '_numInvItems': function() {
        return this.inventory.items.length;
    }
});