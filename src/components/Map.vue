<script>
import { ref } from "vue";
import esriRequest from "@arcgis/core/request";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import BaseTileLayer from "@arcgis/core/layers/BaseTileLayer";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as echarts from "echarts"; // eslint-disable-line no-unused-vars
import axios from "axios";
import { Search, Edit, Check, Message, Star, Delete } from "@element-plus/icons";
var tempthis = null;
export default {
  name: "Map",
  setup() {
    return {
      map: null,
      view: null,
      Graphic: null,
      longPath: [],
      positions: [
        [86.057925, 44.301434],
        [86.05809, 44.306786],
        [86.053574, 44.306857],
        [86.053146, 44.301442],
        [86.051786, 44.30332],
        [86.051842, 44.309743],
        [86.068047, 44.306813],
        [86.072437, 44.312621],
        [86.075623, 44.311182],
        [86.06348, 44.312703],
        [86.051956, 44.316496],
        [86.06559, 44.31648],
        [86.051931, 44.320401],
        [86.05865, 44.322063],
        [86.06255, 44.321915],
        [86.057915, 44.324734],
        [86.049467, 44.325782],
        [86.046487, 44.321252],
        [86.040307, 44.32487],
        [86.040086, 44.331692],
        [86.034679, 44.331687],
        [86.02742, 44.331643],
        [86.017614, 44.331716],
        [86.017951, 44.335504],
        [86.018049, 44.337905],
        [86.018492, 44.344858],
        [86.019515, 44.354316],
        [86.016462, 44.355236],
        [86.006285, 44.347224],
        [86.002731, 44.345497],
        [86.01917, 44.326334],
        [86.020121, 44.323864],
        [86.021485, 44.320312],
        [86.023364, 44.315346],
        [86.027962, 44.315563],
        [86.028072, 44.314208],
        [86.028084, 44.312145],
        [86.028084, 44.310758],
        [86.030304, 44.309806],
        [86.030169, 44.310733],
        [86.033125, 44.310288],
        [86.022469, 44.309716],
        [86.016265, 44.306848],
        [86.017245, 44.30969],
        [86.022372, 44.307993],
        [86.028035, 44.305821],
        [86.028035, 44.304931],
        [86.03305, 44.301488],
        [86.035613, 44.303137],
        [86.041069, 44.301492],
        [86.04411, 44.303554],
        [86.035613, 44.29984],
        [86.041033, 44.296862],
        [86.038666, 44.2969],
        [86.03077, 44.296872],
        [86.027864, 44.292372],
        [86.039843, 44.292294],
        [86.0517, 44.29245],
        [86.056041, 44.288475],
        [86.048083, 44.288514],
        [86.040003, 44.288538],
        [86.027962, 44.2885],
        [86.026417, 44.291162],
        [86.013567, 44.286402],
        [86.013935, 44.276406],
        [86.007534, 44.275097],
        [85.9767232, 44.278743],
        [85.994552, 44.265471],
        [86.077863, 44.296787],
        [86.088384, 44.296754],
        [86.085465, 44.294035],
        [86.081211, 44.292288],
        [86.092068, 44.303497],
        [86.092068, 44.306752],
        [86.092289, 44.309396],
        [86.085349, 44.312546],
        [86.081523, 44.314937],
        [86.112349, 44.309544],
        [86.115732, 44.307692],
        [86.117901, 44.319991],
        [86.079218, 44.287011],
        [86.087093, 44.281771],
        [86.065445, 44.271922],
        [86.065316, 44.273228],
        [86.046874, 44.283008],
        [86.06524, 44.26962],
        [86.086995, 44.279564],
        [86.0853, 44.277935],
        [86.085322, 44.285693],
        [86.091981, 44.288304],
        [86.112473, 44.289778],
        [86.116803, 44.28492],
        [86.107931, 44.279927],
        [86.107158, 44.277715],
        [86.094275, 44.283855],
        [86.079722, 44.306528],
        [86.028098, 44.312534],
        [86.033291, 44.312811],
        [86.091963, 44.288318],
        [86.113842, 44.283489],
        [86.131299, 44.305214], //随机的目的点
      ],
      paths: [],
      startingPoint: {},
      peopleGra: [],
      simpleMarkerSymbol: [
        {
          type: "simple-marker",
          color: [192, 192, 192], // grey
          outline: {
            color: [255, 255, 255], // White
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // pink level 2
          outline: {
            color: [255, 255, 255], // White
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], //
          outline: {
            color: [255, 255, 255], // White
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // grey level 4
          outline: {
            color: [255, 255, 255], // White
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // grey level 5
          outline: {
            color: [255, 255, 255], // White
            width: 2,
          },
        },
      ],
      moving: null,
      moveLayer: null,
      peopleMove: [],
      // 移动图层
    };
  },
  created() {
    const pointnumbers = 2; // 生成的路径数量
    for (let i = 0; i < pointnumbers; i++) {
      this.getPaths(this.positions);
    }
    tempthis = this;
    console.log(this.paths[0]);
  },
  mounted() {
    this.initMap();

    // 基于准备好的dom，初始化echarts实例
    // 基于准备好的dom，初始化echarts实例
    //   var myChart = this.$echarts.init(document.getElementById("myChart"));
    //   // 绘制图表
    //   myChart.setOption({
    //     title: {
    //       text: "不同风险等级的密接人数",
    //     },
    // xAxis: {
    //   type: 'category',
    //   data: ['Ⅰ级', 'Ⅱ级', 'Ⅲ级', 'Ⅳ级', 'Ⅴ级',],
    //   axisLabel:{
    //     inside:false,
    //     textStyle:{
    //       color:'#000',
    //       fontSize:'28',
    //       itemSize:'28',
    //     }
    //   }
    // },
    // yAxis: {
    //   type: 'value'
    // },
    // series: [
    //   {
    //     data: [11,22 ,96 ,199 , 859],
    //     type: 'line',
    //     smooth: true
    //   }
    // ]
    //   });
  },
  methods: {
    initMap() {
      var map = new Map({
        basemap: "",
      });

      const PathsGraphicesLayer = new GraphicsLayer();
      // start: [82.44588962665374, 46.88118885250511]  end :[82.48398118522127,46.88761013863202]
      var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 14,
        center: [86.05775587825876, 44.30152194422269], // longitude, latitude
      });
      view.on("click", function (e) {
        console.info(e.mapPoint);
        // tempthis.initAllPoints();

        // tempthis.updateGraphic();
        // tempthis.drawPoint(0, 1);
        // var startNum = 0; // eslint-disable-line no-unused-vars
        // var endNum = 0; // eslint-disable-line no-unused-vars
        // if (tempthis.moving != undefined) {
        //   clearInterval(tempthis.moving); //清除移动
        // }
        // tempthis.startingPoint = {
        //   type: "point",
        //   longitude: tempthis.paths[0][0][0][0],
        //   latitude: tempthis.paths[0][0][0][1],
        // };
        // tempthis.peopleGra.geometry = tempthis.startingPoint;
        // console.log(tempthis.startingPoint);
        // tempthis.move(0, 1);
        //生成50条路径

        // for (let i = 0; i < 1; i++) {
        //   //每条完整路径
        //   for (let j = 0; j < tempthis.paths[i].length; j++) {
        //     //每条分段路径
        //   }
        // }
      });
      console.info(view);
      this.map = map;
      // 加载高德地图
      var gdLayer = this.loadGdMapLayer();
      view.map.layers.add(gdLayer);
      this.view = view;
      map.add(PathsGraphicesLayer);

      var startBtn = document.getElementById("startBtn");
      var pauseBtn = document.getElementById("pauseBtn");
      var showPathBtn = document.getElementById("showPathBtn");
      var disPathBtn = document.getElementById("disPathBtn");
      this.view.ui.add(startBtn, "top-right");
      this.view.ui.add(pauseBtn, "top-right");
      this.view.ui.add(showPathBtn, "top-right");
      this.view.ui.add(disPathBtn, "top-right");

      startBtn.onclick = function () {
        tempthis.initAllPoints();
        tempthis.updateGraphic();
      };
      pauseBtn.onclick = function () {
        clearInterval(tempthis.moving);
      };
      showPathBtn.onclick = function () {
        for (let i = 0; i < tempthis.longPath.length; i++) {
          //生成随机颜色路径
          // let R = Math.floor(Math.random() * 255);
          // let G = Math.floor(Math.random() * 255);
          // let B = Math.floor(Math.random() * 255);
          // const simpleLineSymbolA = {
          //   type: "simple-line",
          //   color: [R, G, B],
          //   width: 3,
          // };
          var simpleLineSymbolA = null;
          if (i == 0) {
            simpleLineSymbolA = {
              type: "simple-line",
              color: [255, 0, 0],
              width: 3,
            };
          } else {
            simpleLineSymbolA = {
              type: "simple-line",
              color: [192, 192, 192],
              width: 2,
            };
          }
          const polyline = {
            type: "polyline",
            paths: tempthis.longPath[i],
          };
          const popupTemplate = {
            title: "{Name}",
            content: "{Description}",
          };
          const attributes = {
            Name: "这是第" + i + "个",
            Description: "TODO:详细信息",
          };
          const polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbolA,
            attributes: attributes,
            popupTemplate: popupTemplate,
          });
          PathsGraphicesLayer.add(polylineGraphic);
          // lineGraphics.push(polylineGraphic)
        }
      };

      disPathBtn.onclick = function () {
        PathsGraphicesLayer.removeAll();
      };

      // this.peopleGra = new Graphic({
      //   geometry: this.startingPoint,
      //   symbol: this.simpleMarkerSymbol,
      // });
      // let polyline = {
      //   type: "polyline", // autocasts as new Polyline()
      //   paths: this.paths[5],
      // };
      // let lineSymbol = {
      //   type: "simple-line", // autocasts as SimpleLineSymbol()
      //   color: [226, 119, 40],
      //   width: 2,
      // };
      // var polylineGraphic = new Graphic({
      //   geometry: polyline,
      //   symbol: lineSymbol,
      // });
      // graphicsLayer.add(polylineGraphic);

      this.moveLayer = new GraphicsLayer({
        id: "moveLayer",
      });
      console.log(this.moveLayer);
      // this.moveLayer.add(this.peopleGra);
      //动态图
      // var startS = {
      //       type: 'picture-marker',
      //       url: '../../assets/people.png',
      //       width: '48px',
      //       height: '48px'
      // }
      // this.moveLayer.add(
      //   new Graphic({
      //     geometry: this.peopleGra.geometry,
      //     symbol: this.peopleSymbol,
      //   })
      // );
      map.add(this.moveLayer);
    },
    initAllPoints() {
      for (let i = 0; i < this.longPath.length; i++) {
        if (i == 0) {
          this.peopleMove.push({
            start: 0,
            end: 1,
            PathLen: this.longPath[i].length,
            stat: 4,
          });
        } else {
          this.peopleMove.push({
            start: 0,
            end: 1,
            PathLen: this.longPath[i].length,
            stat: 0,
          });
        }
      }
      for (let i = 0; i < this.longPath.length; i++) {
        if (i == 0) {
          this.peopleGra.push(
            new Graphic({
              geometry: {
                type: "point",
                longitude: this.longPath[0][0][0],
                latitude: this.longPath[0][1][1],
              },
              symbol: this.simpleMarkerSymbol[4],
            })
          );
        } else {
          this.peopleGra.push(
            new Graphic({
              geometry: {
                type: "point",
                longitude: this.longPath[i][0][0],
                latitude: this.longPath[i][1][1],
              },
              symbol: this.simpleMarkerSymbol[0],
            })
          );
        }
      }
      console.log(this.peopleMove);
    },
    updateGraphic() {
      this.moving = setInterval(() => {
        this.moveLayer.removeAll();
        this.updateAllPoint();
        this.updateStatus();
        for (let i = 0; i < this.longPath.length; i++) {
          this.moveLayer.add(this.peopleGra[i]);
        }
      }, 100);
    },
    updateStatus() {
      for (let i = 0; i < this.longPath.length; i++) {
        for (let j = 1; j < this.longPath.length; j++) {
          if (this.peopleMove[i].stat >= 3 && this.peopleMove[j].stat < 3) {
            if (i != j) {
              if (
                0.006 >=
                  Math.sqrt(
                    (this.peopleGra[i].geometry.longitude -
                      this.peopleGra[j].geometry.longitude) *
                      (this.peopleGra[i].geometry.longitude -
                        this.peopleGra[j].geometry.longitude) +
                      (this.peopleGra[i].geometry.latitude -
                        this.peopleGra[j].geometry.latitude) *
                        (this.peopleGra[i].geometry.latitude -
                          this.peopleGra[j].geometry.latitude)
                  ) &&
                Math.floor(Math.random() * 30) >= 22 // 用以减慢传染速度
              ) {
                this.peopleMove[j].stat++;
                console.log("增加了传染者" + this.peopleMove[j].stat);
              }
            }
          }
        }
      }
    },
    updateAllPoint() {
      for (let i = 0; i < this.longPath.length; i++) {
        if (this.peopleMove[i].end >= this.longPath[i].length) {
          this.peopleGra[i] = new Graphic({
            geometry: {
              type: "point",
              longitude: this.peopleGra[i].geometry.longitude,
              latitude: this.peopleGra[i].geometry.latitude,
            },
            symbol: this.simpleMarkerSymbol[this.peopleMove[i].stat],
          });
          continue;
        }
        var startX = this.longPath[i][this.peopleMove[i].start][0];
        var startY = this.longPath[i][this.peopleMove[i].start][1];
        var endX = this.longPath[i][this.peopleMove[i].end][0];
        var endY = this.longPath[i][this.peopleMove[i].end][1];
        var p = (endX - startX) / (endY - startY);
        var v = 0.0005;
        if (startX == endX && startY == endY) {
          // this.peopleGra[i].geometry.longitude = endX;
          // this.peopleGra[i].geometry.latitude = endY;
          this.peopleGra[i] = new Graphic({
            geometry: {
              type: "point",
              longitude: this.peopleGra[i].geometry.longitude,
              latitude: this.peopleGra[i].geometry.latitude,
            },
            symbol: this.simpleMarkerSymbol[this.peopleMove[i].stat],
          });
          this.peopleMove[i].end++;
          this.peopleMove[i].start++;
          // console.log(
          //   "有两个相同的点，更新位置" +
          //     this.peopleGra[i].geometry.longitude +
          //     "  " +
          //     this.peopleGra[i].geometry.latitude
          // );
        } else {
          var newX, newY;
          if (Math.abs(p) == Number.POSITIVE_INFINITY) {
            endY > startY
              ? (newY = this.peopleGra[i].geometry.latitude + v)
              : (newY = this.peopleGra[i].geometry.latitude - v);
            newX = this.peopleGra[i].geometry.longitude;
          } else {
            if (endX < startX) {
              newX =
                this.peopleGra[i].geometry.longitude - (1 / Math.sqrt(1 + p * p)) * v;
              newY = this.peopleGra[i].geometry.latitude - (p / Math.sqrt(1 + p * p)) * v;
            } else {
              newX =
                this.peopleGra[i].geometry.longitude + (1 / Math.sqrt(1 + p * p)) * v;
              newY = this.peopleGra[i].geometry.latitude + (p / Math.sqrt(1 + p * p)) * v;
            }
          }
          if (
            (this.peopleGra[i].geometry.longitude - endX) * (newX - endX) <= 0 ||
            (this.peopleGra[i].geometry.latitude - endY) * (newY - endY) <= 0
          ) {
            // this.peopleGra[i].geometry.longitude = endX;
            // this.peopleGra[i].geometry.latitude = endY;
            //上面的两行不知为何不起作用，一定要新建graphic才可以
            this.peopleGra[i] = new Graphic({
              geometry: {
                type: "point",
                longitude: endX,
                latitude: endY,
              },
              symbol: this.simpleMarkerSymbol[this.peopleMove[i].stat],
            });
            this.peopleMove[i].end++;
            this.peopleMove[i].start++;
            // console.log(
            //   "到达第二段位置，更新位置" +
            //     this.peopleGra[i].geometry.longitude +
            //     "  " +
            //     this.peopleGra[i].geometry.latitude
            // );
          } else {
            // this.peopleGra[i].geometry.longitude = newX;
            // this.peopleGra[i].geometry.latitude = newY;
            this.peopleGra[i] = new Graphic({
              geometry: {
                type: "point",
                longitude: newX,
                latitude: newY,
              },
              symbol: this.simpleMarkerSymbol[this.peopleMove[i].stat],
            });
            // console.log(
            //   "尚未到达第二段位置，更新位置" +
            //     this.peopleGra[i].geometry.longitude +
            //     "  " +
            //     this.peopleGra[i].geometry.latitude
            // );
          }
        }
      }
    },
    drawPoint(start, end) {
      // 已废弃
      var startX = this.longPath[0][start][0];
      var startY = this.longPath[0][start][1];
      var endX = this.longPath[0][end][0];
      var endY = this.longPath[0][end][1];
      var pathLen = this.longPath[0].length;
      var p = (endY - startY) / (endX - startX);
      var v = 0.0005;
      if (end < pathLen) {
        if (startX == endX && startY == endY) {
          this.drawPoint(start + 1, end + 1);
        } else {
          this.peopleGra = new Graphic({
            geometry: {
              type: "point",
              longitude: this.longPath[0][start][0],
              latitude: this.longPath[0][start][1],
            },
            symbol: this.simpleMarkerSymbol,
          });

          var moving = setInterval(() => {
            var startNum = start;
            var endNum = end;
            var newX, newY;
            if (Math.abs(p) == Number.POSITIVE_INFINITY) {
              endY > startY
                ? (newY = this.peopleGra.geometry.latitude + v)
                : (newY = this.peopleGra.geometry.latitude - v);
              newX = this.peopleGra.geometry.longitude;
            } else {
              if (endX < startX) {
                newX = this.peopleGra.geometry.longitude - (1 / Math.sqrt(1 + p * p)) * v;
                newY = this.peopleGra.geometry.latitude - (p / Math.sqrt(1 + p * p)) * v;
              } else {
                newX = this.peopleGra.geometry.longitude + (1 / Math.sqrt(1 + p * p)) * v;
                newY = this.peopleGra.geometry.latitude + (p / Math.sqrt(1 + p * p)) * v;
              }
            }

            if (
              (this.peopleGra.geometry.longitude - endX) * (newX - endX) < 0 ||
              (this.peopleGra.geometry.latitude - endY) * (newY - endY) < 0 ||
              (Math.abs(this.peopleGra.geometry.longitude - endX) <= v &&
                Math.abs(this.peopleGra.geometry.latitude - endY) <= v)
            ) {
              this.peopleGra.geometry.longitude = endX;
              this.peopleGra.geometry.latitude = endY;
              console.log("add graphic  " + end);
              this.moveLayer.removeAll();
              this.moveLayer.add(this.peopleGra);
              clearInterval(moving);
              startNum++;
              endNum++;
              if (endNum < pathLen) {
                console.log("endNum:" + endNum);
                this.drawPoint(startNum, endNum);
              }
            } else {
              // debugger;
              this.peopleGra = new Graphic({
                geometry: {
                  type: "point",
                  longitude: newX,
                  latitude: newY,
                },
                symbol: this.simpleMarkerSymbol,
              });
              console.log("add graphic else " + end);
              this.moveLayer.removeAll();
              this.moveLayer.add(this.peopleGra);
            }
          }, 100);
        }
      }
    },
    getLongPath() {
      // 用来将获取到的路径整合到一起 已废弃
      let pathsLen = this.paths.length;
      for (let i = 0; i < pathsLen; i++) {
        this.longPath[i] = new Array();
        console.log(this.paths[i][0][0][0]);
        for (let j = 0; j < this.paths[i].length; j++) {
          for (let k = 0; k < this.paths[i][j].length; k++) {
            var tempa = new Array();
            tempa.push(this.paths[i][j][k][0]);
            tempa.push(this.paths[i][j][k][1]);
            this.longPath[i].push(tempa);
          }
        }
      }
      console.log(this.longPath);
    },
    loadGdMapLayer() {
      var gdMapLayer = new WebTileLayer({
        id: "gaode",
        urlTemplate: "",
        name: "高德地图",
      });

      gdMapLayer.urlTemplate =
        "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={col}&y={row}&z={level}"; //"https://webst01.is.autonavi.com/appmaptile?style=6&x={col}&y={row}&z={level}"; 卫星地图
      //   switch (this.gdLayerType) {
      //     // 默认：标准
      //     case "normal":
      //       gdMapLayer.urlTemplate =
      //         "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={col}&y={row}&z={level}";
      //       break;
      //     case "st":
      //       gdMapLayer.urlTemplate =
      //         "https://webst01.is.autonavi.com/appmaptile?style=6&x={col}&y={row}&z={level}";
      //       break;
      //     case "label":
      //       gdMapLayer.urlTemplate =
      //         "https://wprd04.is.autonavi.com/appmaptile?x={col}&y={row}&z={level}&lang=zh_cn&size=1&scl=1&style=8";
      //       break;
      //     default:
      //       gdMapLayer.urlTemplate =
      //         "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={col}&y={row}&z={level}";
      //       break;
      //   }
      return gdMapLayer;
    },
    getPaths(positions) {
      // positions= 所有标记点，用以随机选取 Pathnumber = 需要创建的路径数
      var temppath;
      var temppaths = new Array();
      var tstart = positions[Math.floor(Math.random() * positions.length)]; //随机数选起点和终点
      var tend = positions[Math.floor(Math.random() * positions.length)]; // TODO: 使得被选中的点不再被选中
      axios
        .get(
          "https://restapi.amap.com/v3/direction/walking?origin=" +
            tstart +
            "&destination=" +
            tend +
            "&&key=051b74eefaa0e56e8d7ad11b11b96d2b",
          {}
        )
        .then((res) => {
          // res.data.result.routes[0].steps.forEach(element => {
          //     paths.push(element.)
          // })
          // console.log(res)
          res.data.route.paths[0].steps.forEach((element) => {
            temppath = element.polyline.split(";");
            var myarr = new Array(); //先声明一维
            for (var i = 0; i < temppath.length; i++) {
              myarr[i] = new Array(); //再声明二维
              for (var j = 0; j < 2; j++) {
                //二维长度为3
                myarr[i] = temppath[i].split(",");
              }
            }
            temppaths.push(myarr);
            //   const polyline = {
            //   type: "polyline",
            //   paths: myarr
            //   }
            //   const polylineGraphic = new Graphic({
            //   geometry: polyline,
            //   symbol: simpleLineSymbol
            // })
            // lineGraphics.push(polylineGraphic)
          });
          console.log(temppaths);

          var templongpath = new Array();
          for (let j = 0; j < temppaths.length; j++) {
            for (let k = 0; k < temppaths[j].length; k++) {
              var tempa = new Array();
              tempa.push(temppaths[j][k][0]);
              tempa.push(temppaths[j][k][1]);
              templongpath.push(tempa);
            }
          }
          this.longPath.push(templongpath);
          // lineGraphics.forEach(ele =>{
          //   graphicsLayer.add(ele)
          // })
        })
        .catch((err) => {
          console.log(err);
        });
      //使用this.longpath替代this.paths
      // this.paths.push(temppaths);
    },
    drawPath(simpleLineSymbol, path, graphicsLayer) {
      const polyline = {
        type: "polyline",
        paths: path,
      };
      const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol,
      });
      graphicsLayer.add(polylineGraphic);
      // lineGraphics.push(polylineGraphic)
    },
  },
};
</script>

<template>
  <div class="map">
    <div id="viewDiv" style="width: 70%; height: 80%; float: left"></div>
    <el-button  id="startBtn">开始</el-button>
    <el-button  id="pauseBtn">停止</el-button>
    <el-button  id="showPathBtn">显示路径</el-button>
    <el-button  id="disPathBtn">隐藏路径</el-button>
  </div>
  <div
    id="myChart"
    :style="{ padding: '50px', width: '350px', height: '660px', float: 'left' }"
  ></div>

  <link rel="stylesheet" href="https://js.arcgis.com/4.21/esri/themes/light/main.css" />
</template>

<style scoped>
.map {
  padding: 0 12px 12px 12px;
  border-radius: 5px;
  height: calc(100vh - 69px);
}
</style>
