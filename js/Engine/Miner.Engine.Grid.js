var Miner = Miner || {};
Miner.Engine = Miner.Engine || {};

Miner.Engine.Grid = Miner.Engine.Grid || Class.extend({
    'init': function(o) {
        // "Private"
        this._map = o.map || {};
        this._game = o.game || {};
        this._cellTypes = {
            'Ar': 'Air',
            'Do': 'Door',
            'Dt': 'Dirt',
            'Tl': 'Tunnel',
            'El': 'Elevator',
            'Ec': 'ElevatorCar',
            'Rd': 'Road'
        };

        // Public 
        this.cols;
        this.rows;
        this._grid = [];

        return this._loadMap();
    },
    
    '_loadMap': function() {
        var map = this._map;
        var mapArray = map.mapArray;
        var cellTypes = this._cellTypes;
        var len_mapArray = mapArray.length;
        
        this.numCols = map.numCols();
        this.numRows = map.numRows();
        
        for (var i = 0; i < len_mapArray; i++) {
            
            var row = mapArray[i];
            var len_row = row.length;
            
            for (var j = 0; j < len_row; j++) {
                
                var type = cellTypes[mapArray[i][j]];
                var offset = this._getOffset(j, i);
                
                if (typeof this._grid[offset] === 'undefined') {
                    this._grid[offset] = {};
                }
                
                var grid = this._grid[offset];
                grid.cell = new Miner.Engine.Cell[type]({'grid': this});
                grid.row = i;
                grid.col = j;
            }
        }
        
        return this;
    },
    
    '_getOffset': function(x, y) {
        return (y * this.numCols) + x;
    },
    
    'getCell': function(x, y) {
        return this._grid[this._getOffset(x, y)].cell;
    }
});