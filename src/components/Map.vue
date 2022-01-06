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
      HousePositions:[
 [85.9538637678786, 44.280990566986624],
 [85.98992390355505, 44.26553632335501],
 [85.98652500842226, 44.267392520142536],
 [86.00823588113867, 44.25440866882848],
 [86.00626177530386, 44.25330208897101],
 [86.01126723321124, 44.254395519808476],
 [86.0075299223834, 44.2762624279048],
 [86.0083109816812, 44.27410537979737],
 [86.01306171015713, 44.27559104804607],
 [86.05847699452501, 44.27523814969916],
 [86.05631406078243, 44.273726354768854],
 [86.06576396834123, 44.27167220594255],
 [86.09103393972156, 44.2823318455086],
 [86.09409848029594, 44.27842025973363],
 [86.11387777562615, 44.29038391056891],
 [86.10855073599355, 44.29232615278895],
 [86.0957567738131, 44.2978482086137],
 [86.0993218601806, 44.29626708442933],
 [86.0928621339747, 44.306312743293],
 [86.11512305121538, 44.349711938051186],
 [86.08016201638381, 44.37140086286619],
 [86.05580859776605, 44.37910351906986],
 [86.03329883504362, 44.381677352052826],
 [86.0386718360114, 44.3849775063332],
 [86.03287401308465, 44.37329326643519],
 [86.07683168482924, 44.33679446210781],
 [86.07338129141432, 44.33382311599283],
 [86.09634529303405, 44.32400248193933],
 [86.08904607574874, 44.32956242267595],
 [86.09734092888932, 44.31033866240289],
 [86.09579597616968, 44.31213202857016],
 [86.09656845269383, 44.30940510756362],
 [86.09130703122857, 44.31089141792337],
 [86.09288760007276, 44.30635979787628],
 [86.09535609389235, 44.29322523054189],
 [86.09630023081077, 44.29230369099589],
 [86.09210954836276, 44.30231697838157],
 [86.08704768298577, 44.302634856665165],
 [86.08594905023868, 44.30481542662156],
 [86.08679448337149, 44.309827358991406],
 [86.08548771127022, 44.29520341903769],
 [86.07923065378614, 44.29346482737747],
 [86.07379757127163, 44.29457679454697],
 [86.07396569537869, 44.29614614527837],
 [86.06815205727781, 44.293441789159054],
 [86.0665212741969, 44.29465205126263],
 [86.07206379064328, 44.292782892380714],
 [86.0556787115903, 44.29549061881611],
 [86.05564437918396, 44.29471041322459],
 [86.05140541599116, 44.299008327519246],
 [86.05064581436555, 44.30332742609865],
 [86.04886855829179, 44.30354447159302],
 [86.05222824035214, 44.293589133377886],
 [86.04631761161349, 44.294082542128216],
 [86.04086111555162, 44.29520649019284],
 [86.03647731339963, 44.29485939051267],
 [86.03688071737349, 44.29485324699393],
 [86.03625444889245, 44.28862635108128],
 [86.03306339698017, 44.28847607373565],
 [86.02518842803887, 44.29113945630579],
 [86.00785492076291, 44.31305632574154],
 [86.00368354910633, 44.31298262749379],
 [86.00508688073192, 44.30649993575866],
 [86.00497249639217, 44.304918366519175],
 [86.01529000415172, 44.33400422289288],
 [86.01572774053194, 44.33335959481892],
 [86.02682898016747, 44.33185345282371],
 [86.03238216040205, 44.331687628076914],
 [86.04232129049855, 44.3316484655974],
 [86.04172905861714, 44.3316484655974],
 [86.04116736207224, 44.33395510250114],
 [86.0139350148, 44.34861017370013],
 [86.04725019404464, 44.32135222146195],
 [86.04869214954574, 44.32137678397296],
 [86.0588373363346, 44.321008346633434],
 [86.04747120584095, 44.303655399982375],
 [86.06535617522384, 44.28907292963613],
 [86.07414524211164, 44.2546258138684],
 [86.03963272109539, 44.239417804576284],
 [86.06007295937326, 44.25355488423316],
      ],
      EatingPositions:[
[86.07424995308651, 44.255754267761034],
[86.0822945911399, 44.296524660879015],
[86.08537591265952, 44.29578747181951],
[86.0853673297214, 44.294288492097365],
[86.08529866556351, 44.29405504105369],
[86.08535016384562, 44.293440691644015],
[86.08535874678351, 44.29304750432088],
[86.08479226437059, 44.292746469123514],
[86.0819512683858, 44.292586734961084],
[86.08123887357327, 44.292586734961084],
[86.08440817315254, 44.29277257936592],
[86.081215271476, 44.292579055675525],
[86.07922399943776, 44.292517619831465],
[86.0750365343638, 44.29293999249687],
[86.0750107848953, 44.293413046074406],
[86.0750107848953, 44.29415948003726],
[86.0750225866804, 44.295425785358],
[86.07386387238581, 44.29658378974693],
[86.07442606332991, 44.29660400509786],
[86.07550753052845, 44.299398842646305],
[86.0761493090517, 44.296874277125546],
[86.07543457490168, 44.30347835644378],
[86.0754388663706, 44.30372405508979],
[86.07541106135888, 44.30467492880645],
[86.07481122946105, 44.30743359404056],
[86.07458012037742, 44.30675489220065],
[86.07558263270896, 44.31070031238849],
[86.07548821875517, 44.311554005289835],
[86.0741921754899, 44.31264106399417],
[86.04900382916172, 44.31277528202373],
[86.04696535014642, 44.31336179284044],
[86.04695462114638, 44.314386636886184],
[86.05146595155756, 44.31472362913214],
[86.08554403598825, 44.30968299402151],
[86.08549253737871, 44.30913022700301],
[86.08660248982412, 44.30964578762106],
[86.09809892007658, 44.30964460782563],
[86.09605017292009, 44.30947030432078],
[86.11058728557803, 44.309030420589245],
[86.0280680609144, 44.30048481074469],
[86.01675687448898, 44.30495532360157],
[86.01643930087616, 44.302676477940935],
[86.02252867990848, 44.30682235736378],
[86.0399789036524, 44.315769202987916],
[86.04006473434089, 44.31746414706937],
      ],
      workPositions:[
[85.99204077926001, 44.26745255501014],
[85.99450790352375, 44.26506349418737],
[85.99426504112306, 44.26576609709412],
[85.9822244591855, 44.29370225165121],
[85.98160647816303, 44.2935793815453],
[85.98043918158567, 44.293235343974835],
[85.9858808468743, 44.29482650137023],
[85.989355901909, 44.29593054079023],
[85.99275266784373, 44.296677165577066],
[85.99316894671564, 44.296870675645685],
[85.99332773352207, 44.29698125262513],
[85.99465810935722, 44.29764778127358],
[85.99577390830757, 44.298394161467854],
[85.99623310252338, 44.29877809821347],
[85.99785101103411, 44.299699536160325],
[85.9974672300223, 44.29956699760477],
[85.9996459458305, 44.30064706627056],
[86.00159001089175, 44.301583831808536],
[86.00529797043028, 44.30463947876698],
[86.00583870370204, 44.305167718907896],
[86.00686438057642, 44.306085601667085],
[86.00876070243149, 44.30789368496602],
[86.00828434217584, 44.30744531615569],
[86.00916369537636, 44.30836859002942],
[86.00637782787757, 44.30808485479591],
[86.0056268093533, 44.30654626504582],
[86.00478137703895, 44.3063036493724],
[86.00217212397763, 44.31119338929827],
[86.00151441934555, 44.30969320492792],
[86.00790561406588, 44.31286159639643],
[86.00833047603908, 44.31153808939954],
[86.01286770123407, 44.31287080884778],
[86.0144464731137, 44.31160279699437],
[86.0214435939083, 44.32032440182049],
[86.02155517373787, 44.320017365357636],
[86.02120755951525, 44.3209016260559],
[86.02233194123929, 44.31793868651388],
[86.02241777192776, 44.31771147040055],
[86.02306579355991, 44.31626217974494],
[86.02541326308628, 44.31565113325216],
[86.02473520067997, 44.31537477849857],
[86.02370523233635, 44.31496024392798],
[86.02318166510392, 44.31479135875094],
[86.02293704777271, 44.31465625011875],
[86.02227185993692, 44.31445051597018],
[86.02188991330766, 44.31426627584296],
[86.02120755935054, 44.314020621440214],
[86.02001022122182, 44.31355694588266],
[86.01917337200905, 44.31320381308702],
[86.01852535037645, 44.312930517270665],
[86.02026771345099, 44.31376882446978],
[86.01844381132085, 44.3130318519297],
[86.01777433185241, 44.31283532442622],
[86.01688169272488, 44.31234707333975],
[86.0161507528275, 44.306874360884215],
[86.02053164271959, 44.309811326765754],
[86.0218963507974, 44.30977754682915],
[86.02308081431468, 44.30980518504567],
[86.02613209538816, 44.309799042973594],
[86.02483605195923, 44.30979290125228],
[86.02942370248788, 44.30980518492849],
[86.02802895363628, 44.30916950359092],
[86.0280675775117, 44.30890540217905],
[86.02807616061328, 44.30830656307376],
[86.02701654182475, 44.307806813135365],
[86.02806221309386, 44.30763478081377],
[86.02807079619552, 44.30618216995177],
[86.02571045234494, 44.30495371869933],
[86.02544437717788, 44.30493836289307],
[86.02649151172473, 44.30486772592162],
[86.02804671262929, 44.30318152613743],
[86.0280724619343, 44.301891585351136],
[86.02927409189998, 44.3014370280996],
[86.03059588430634, 44.30058318816908],
[86.02768193244879, 44.299443691655476],
[86.02796088226842, 44.299118117077406],
[86.02793942459627, 44.298786397821004],
[86.02796088226842, 44.29822124209218],
[86.02796517373736, 44.297729798064196],
[86.02802954691772, 44.29734585446391],
[86.02802954691772, 44.29703562624791],
[86.0280037977767, 44.296061928853554],
[86.02790509219027, 44.29568411754567],
[86.02789221794723, 44.29494384641354],
[86.02802525544891, 44.294710397857905],
[86.02781067872779, 44.29396397095618],
[86.02792225855747, 44.29314073985411],
[86.02734290140951, 44.29241579562863],
[86.02876769070745, 44.29240043654299],
[86.02791796692415, 44.29143587787167],
[86.02792225839319, 44.2910242460147],
[86.02792655002592, 44.29018868627723],
[86.02723561304938, 44.288529818976],
[86.02789650941622, 44.28806287006046],
[86.02717553166566, 44.28731943070564],
[86.035536513639, 44.287982228722434],
[86.03551934759902, 44.29073471991409],
[86.04004262527447, 44.29240811661372],
[86.04149316404057, 44.292236094415294],
[86.05560587427266, 44.29667471623953],
      ],
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
    const pointnumbers = 38; // 生成的路径数量+1
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
      var listPoints = []
      view.on("click", function (e) {
        var tempList = [e.mapPoint.longitude,e.mapPoint.latitude]
        listPoints.push(tempList)
        if(listPoints.length >= 100){
          listPoints.forEach(element => {
            console.log(element)
          });
        }
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
        // console.log(this.peopleGra[0].geometry.latitude)
        this.updateAllPoint();
        this.updateStatus();
        for (let i = 0; i < this.longPath.length; i++) {
          this.moveLayer.add(this.peopleGra[i]);
        }
      }, 25);
    },
    updateStatus() {
      for (let i = 0; i < this.longPath.length; i++) {
        for (let j = 1; j < this.longPath.length; j++) {
          if (this.peopleMove[i].stat >= 3 && this.peopleMove[j].stat < 3) {
            if (i != j) {
              if (
                0.002 >=
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
          // this.peopleGra[i] = new Graphic({
          //   geometry: {
          //     type: "point",
          //     longitude: this.peopleGra[i].geometry.longitude,
          //     latitude: this.peopleGra[i].geometry.latitude,
          //   },
          //   symbol: this.simpleMarkerSymbol[this.peopleMove[i].stat],
          // });
          console.log("symbol:" + this.peopleGra[i].symbol)
          this.peopleGra[i].symbol = this.simpleMarkerSymbol[this.peopleMove[i].stat]
          continue;
        }
        var startX = this.longPath[i][this.peopleMove[i].start][0];
        var startY = this.longPath[i][this.peopleMove[i].start][1];
        var endX = this.longPath[i][this.peopleMove[i].end][0];
        var endY = this.longPath[i][this.peopleMove[i].end][1];
        var p = (endX - startX) / (endY - startY);
        var v = 0.0002;
        if (startX == endX && startY == endY) {
          // this.peopleGra[i].geometry.longitude = endX;
          // this.peopleGra[i].geometry.latitude = endY;
          // this.peopleGra[i] = new Graphic({
          //   geometry: {
          //     type: "point",
          //     longitude: this.peopleGra[i].geometry.longitude,
          //     latitude: this.peopleGra[i].geometry.latitude,
          //   },
          //   symbol: this.simpleMarkerSymbol[this.peopleMove[i].stat],
          // });
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
    getOnePath(type){
      if(type == "single"){
        this.getPaths(this.positions)
      }else{
        //TODO: 随机生成行为模式
        //TODO: 根据行为模式，依次获取并拼接分段路径
      }
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
    <el-button id="startBtn">开始</el-button>
    <el-button id="pauseBtn">停止</el-button>
    <el-button id="showPathBtn">显示路径</el-button>
    <el-button id="disPathBtn">隐藏路径</el-button>
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
