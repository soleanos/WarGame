/**
 * Created by thinhth2 on 1/20/2017.
 */

import Vue = require('vue');
import {AppConfig} from "./app.config";

function generateComponents (components) {
    var componentDict = {};
    for (let i = 0; i < components.length; i++) {
        componentDict[components[i].tag] = new components[i];
    }

    return componentDict;
}

var app = new Vue({
    el: '#app',
    data: AppConfig.data,
    components: generateComponents(AppConfig.components)
});

// class SimpleGame {
//
//     game: Phaser.Game;
//
//     constructor() {
//         this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
//     }
//
//     preload() {
//         this.game.load.image('logo', 'assets/images/tank_armor_down_c0_t1.png');
//     }
//
//     create() {
//         var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//         logo.anchor.setTo(0.5, 0.5);
//     }
//
// }
//
// window.onload = () => {
//
//     var game = new SimpleGame();
//
// };