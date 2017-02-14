/**
 * Created by thuctvd on 2/9/2017.
 */

import {GameController} from './gamecontroller';
import {Room} from "../model/room";
import {MapManager} from "./map/mapmanager";
import {ConfigManager} from "../manager/configmanager";
import {KeyExchange} from "../../share/keyexchange";
import {User} from "../model/user";

export class TankGameLogic {
    public controller: GameController;

    private currentRoom:Room;
    public mapManager:MapManager;

    constructor (room:Room) {
        this.controller = new GameController(this, room);
        this.currentRoom = room;
    };

    public startGame() {
        // setTimeout(this.controller.startGame, ConfigManager.getInstance().startGameTime * 1000);
        setTimeout(function() {
            this.controller.startGame();
        }.bind(this), ConfigManager.getInstance().startGameTime * 1000);
    }

    public handleActionInGame(subId, data, client) {
        switch (subId) {
            case KeyExchange.KEY_COMMAND.MOVE:
                this.handlePlayerMove(data, client);
                break;
            case KeyExchange.KEY_COMMAND.STOP_MOVE:
                this.handlePlayerStopMove(data, client);
                break;
            case KeyExchange.KEY_COMMAND.HIT_MAP_ITEM:
                this.handlePlayerHitMapItem(data, client);
                break;
        }

    }

    private handlePlayerMove(data, client) {
        var playerId:number = data[KeyExchange.KEY_DATA.PLAYER_ID];
        var posPoint = data[KeyExchange.KEY_DATA.PLAYER_POSITION];
        var direction = data[KeyExchange.KEY_DATA.PLAYER_DIRECTION];

        this.controller.move(playerId, posPoint, direction);
    }

    private handlePlayerStopMove(data, client) {
        var playerId:number = data[KeyExchange.KEY_DATA.PLAYER_ID];
        var posPoint = data[KeyExchange.KEY_DATA.PLAYER_POSITION];

        this.controller.stopMove(playerId, posPoint);
    }

    private handlePlayerHitMapItem(data, client) {
        let rowId:number = data[KeyExchange.KEY_DATA.ROW_ID];
        let colId:number = data[KeyExchange.KEY_DATA.COL_ID];
        let itemId:number = data[KeyExchange.KEY_DATA.MAP_ITEM_ID];
        let actionTime:number = data[KeyExchange.KEY_DATA.ACTION_TIME];
        let userAction:User = this.currentRoom.getUserByClientId(client.id);

        this.controller.playerHitMapItem(1, userAction.player.playerId, rowId, colId, itemId, actionTime);
    }

    private initMapInfo(mapId: number) {
        this.mapManager.createMap(mapId);
    }

    /**
     * Get data map hiện tại
     * @returns {Array}
     */
    public getMapData() :Array<any> {
        return this.mapManager.mapData;
    }

    public getPlayerData() :Array<any> {
        return [];
    }

}