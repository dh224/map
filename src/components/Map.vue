<script>
import { ref, toDisplayString } from "vue";
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
      HousePositions: [
        [85.953863, 44.28099],
        [85.989923, 44.265536],
        [85.986525, 44.267392],
        [86.008235, 44.254408],
        [86.006261, 44.253302],
        [86.011267, 44.254395],
        [86.007529, 44.276262],
        [86.00831, 44.274105],
        [86.013061, 44.275591],
        [86.058476, 44.275238],
        [86.056314, 44.273726],
        [86.065763, 44.271672],
        [86.091033, 44.282331],
        [86.094098, 44.27842],
        [86.113877, 44.290383],
        [86.10855, 44.292326],
        [86.095756, 44.297848],
        [86.099321, 44.2962673],
        [86.092862, 44.306312],
        [86.115123, 44.349711],
        [86.080162, 44.3714],
        [86.055808, 44.379103],
        [86.033298, 44.381677],
        [86.038671, 44.384977],
        [86.032874, 44.373293],
        [86.076831, 44.336794],
        [86.073381, 44.333823],
        [86.096345, 44.324002],
        [86.089046, 44.329562],
        [86.09734, 44.310338],
        [86.095795, 44.312132],
        [86.096568, 44.309405],
        [86.091307, 44.310891],
        [86.092887, 44.306359],
        [86.095356, 44.293225],
        [86.0963, 44.292303],
        [86.092109, 44.302316],
        [86.087047, 44.302634],
        [86.085949, 44.304815],
        [86.086794, 44.309827],
        [86.085487, 44.295203],
        [86.07923, 44.293464],
        [86.073797, 44.294576],
        [86.073965, 44.296146],
        [86.068152, 44.293441],
        [86.066521, 44.294652],
        [86.072063, 44.292782],
        [86.055678, 44.29549],
        [86.055644, 44.29471],
        [86.051405, 44.299008],
        [86.050645, 44.303327],
        [86.048868, 44.303544],
        [86.052228, 44.293589],
        [86.046317, 44.294082],
        [86.040861, 44.295206],
        [86.036477, 44.294859],
        [86.03688, 44.294853],
        [86.036254, 44.288626],
        [86.033063, 44.288476],
        [86.025188, 44.291139],
        [86.007854, 44.313056],
        [86.003683, 44.312982],
        [86.005086, 44.306499],
        [86.004972, 44.304918],
        [86.01529, 44.334004],
        [86.015727, 44.333359],
        [86.026828, 44.331853],
        [86.032382, 44.331687],
        [86.042321, 44.331648],
        [86.041729, 44.331648],
        [86.041167, 44.333955],
        [86.013935, 44.34861],
        [86.04725, 44.321352],
        [86.048692, 44.321376],
        [86.058837, 44.321008],
        [86.047471, 44.303655],
        [86.065356, 44.289072],
        [86.074145, 44.254625],
        [86.039632, 44.239417],
        [86.060072, 44.253554],
      ],
      EatingPositions: [
        [86.074249, 44.255754],
        [86.082294, 44.296524],
        [86.085375, 44.295787],
        [86.085367, 44.294288],
        [86.085298, 44.294055],
        [86.08535, 44.29344],
        [86.085358, 44.293047],
        [86.084792, 44.292746],
        [86.081951, 44.292586],
        [86.081238, 44.292586],
        [86.084408, 44.292772],
        [86.081215, 44.292579],
        [86.079223, 44.292517],
        [86.075036, 44.292939],
        [86.07501, 44.293413],
        [86.07501, 44.294159],
        [86.075022, 44.295425],
        [86.073863, 44.296583],
        [86.074426, 44.296604],
        [86.075507, 44.299398],
        [86.076149, 44.296874],
        [86.075434, 44.303478],
        [86.075438, 44.303724],
        [86.075411, 44.304674],
        [86.074811, 44.307433],
        [86.07458, 44.306754],
        [86.075582, 44.3107],
        [86.075488, 44.311554],
        [86.074192, 44.312641],
        [86.049003, 44.312775],
        [86.046965, 44.313361],
        [86.046954, 44.314386],
        [86.051465, 44.314723],
        [86.085544, 44.309682],
        [86.085492, 44.30913],
        [86.086602, 44.309645],
        [86.098098, 44.309644],
        [86.09605, 44.30947],
        [86.110587, 44.30903],
        [86.028068, 44.300484],
        [86.016756, 44.304955],
        [86.016439, 44.302676],
        [86.022528, 44.306822],
        [86.039978, 44.315769],
        [86.040064, 44.317464],
      ],
      workPositions: [
        [85.99204, 44.267452],
        [85.994507, 44.265063],
        [85.994265, 44.265766],
        [85.982224, 44.293702],
        [85.981606, 44.293579],
        [85.980439, 44.293235],
        [85.98588, 44.294826],
        [85.989355, 44.29593],
        [85.992752, 44.296677],
        [85.993168, 44.29687],
        [85.993327, 44.296981],
        [85.994658, 44.297647],
        [85.995773, 44.298394],
        [85.996233, 44.298778],
        [85.997851, 44.299699],
        [85.997467, 44.299566],
        [85.999645, 44.300647],
        [86.00159, 44.301583],
        [86.005297, 44.304639],
        [86.005838, 44.305167],
        [86.006864, 44.306085],
        [86.00876, 44.307893],
        [86.008284, 44.307445],
        [86.009163, 44.308368],
        [86.006377, 44.308084],
        [86.005626, 44.306546],
        [86.004781, 44.306303],
        [86.002172, 44.311193],
        [86.001514, 44.309693],
        [86.007905, 44.312861],
        [86.00833, 44.311538],
        [86.012867, 44.31287],
        [86.014446, 44.311602],
        [86.021443, 44.320324],
        [86.021555, 44.320017],
        [86.021207, 44.320901],
        [86.022331, 44.317938],
        [86.022417, 44.317711],
        [86.023065, 44.316262],
        [86.025413, 44.315651],
        [86.024735, 44.315374],
        [86.023705, 44.31496],
        [86.023181, 44.314791],
        [86.022937, 44.314656],
        [86.022271, 44.31445],
        [86.021889, 44.314266],
        [86.021207, 44.31402],
        [86.02001, 44.313556],
        [86.019173, 44.313203],
        [86.018525, 44.31293],
        [86.020267, 44.313768],
        [86.018443, 44.313031],
        [86.017774, 44.312835],
        [86.016881, 44.312347],
        [86.01615, 44.306874],
        [86.020531, 44.309811],
        [86.021896, 44.309777],
        [86.02308, 44.309805],
        [86.026132, 44.309799],
        [86.024836, 44.309792],
        [86.029423, 44.309805],
        [86.028028, 44.309169],
        [86.028067, 44.308905],
        [86.028076, 44.308306],
        [86.027016, 44.307806],
        [86.028062, 44.307634],
        [86.02807, 44.306182],
        [86.02571, 44.304953],
        [86.025444, 44.304938],
        [86.026491, 44.304867],
        [86.028046, 44.303181],
        [86.028072, 44.301891],
        [86.029274, 44.301437],
        [86.030595, 44.300583],
        [86.027681, 44.299443],
        [86.02796, 44.299118],
        [86.027939, 44.298786],
        [86.02796, 44.298221],
        [86.027965, 44.297729],
        [86.028029, 44.297345],
        [86.028029, 44.297035],
        [86.028003, 44.296061],
        [86.027905, 44.295684],
        [86.027892, 44.294943],
        [86.028025, 44.29471],
        [86.02781, 44.293963],
        [86.027922, 44.29314],
        [86.027342, 44.292415],
        [86.028767, 44.2924],
        [86.027917, 44.291435],
        [86.027922, 44.291024],
        [86.027926, 44.290188],
        [86.027235, 44.288529],
        [86.027896, 44.288062],
        [86.027175, 44.287319],
        [86.035536, 44.287982],
        [86.035519, 44.290734],
        [86.040042, 44.292408],
        [86.041493, 44.292236],
        [86.055605, 44.296674],
      ],
      HospitalPositins: [
        [86.03262, 44.292307],
        [86.035547, 44.292129],
        [86.035521, 44.290206],
        [86.035547, 44.287981],
        [86.027879, 44.284528],
        [86.027916, 44.289419],
        [86.027213, 44.29238],
        [86.014132, 44.284565],
        [86.04831, 44.288513],
        [86.029628, 44.301488],
        [86.016376, 44.30295],
        [86.01641, 44.307065],
        [86.0281, 44.313465],
        [86.033122, 44.31243],
        [86.0281, 44.313327],
        [86.022158, 44.318432],
        [86.01675, 44.332751],
        [86.023094, 44.335503],
        [86.018011, 44.335989],
        [86.049447, 44.312733],
        [86.051867, 44.312045],
        [86.053481, 44.310117],
        [86.059661, 44.297574],
        [86.061497, 44.29852],
        [86.092129, 44.308969],
        [86.082773, 44.31602],
        [86.075821, 44.314693],
        [86.051861, 44.316025],
        [86.058719, 44.301385],
        [86.058685, 44.301373],
      ],
      entertainmentPositions: [
        [86.051666, 44.295843],
        [86.051678, 44.296365],
        [86.051653, 44.292885],
        [86.035494, 44.288922],
        [86.027915, 44.294536],
        [86.034449, 44.309773],
        [86.028068, 44.30962],
        [86.039914, 44.309288],
        [86.051844, 44.308063],
        [86.051853, 44.307946],
        [86.050239, 44.305096],
        [86.051467, 44.304596],
        [86.051806, 44.302169],
        [86.075395, 44.302657],
        [86.085336, 44.293866],
        [86.085741, 44.304368],
        [86.028137, 44.316298],
        [86.039903, 44.309255],
        [86.040521, 44.306866],
        [86.046751, 44.296868],
      ],
      midSchoolPositsions: [
        [86.014329, 44.27622],
        [86.013437, 44.287594],
        [86.019908, 44.284571],
        [86.034053, 44.282925],
        [86.04082, 44.290128],
        [86.04767, 44.289992],
        [86.05857, 44.292057],
        [86.080457, 44.292008],
        [86.047683, 44.289987],
        [86.0408, 44.290073],
        [86.034105, 44.282921],
        [86.06847, 44.300783],
        [86.054548, 44.296655],
        [86.047939, 44.297097],
        [86.047836, 44.297773],
        [86.035202, 44.296029],
        [86.035168, 44.294026],
        [86.034361, 44.292859],
        [86.02128, 44.301766],
        [86.004029, 44.310365],
        [86.023907, 44.304776],
        [86.032164, 44.313006],
        [86.045588, 44.309997],
        [86.04933, 44.316801],
        [86.07156, 44.313215],
        [86.115849, 44.307466],
        [86.062462, 44.321677],
        [86.014826, 44.335197],
        [86.024645, 44.335651],
        [86.113033, 44.312778],
      ],
      libraryPositions:[
[86.022389, 44.300668],
[86.016278, 44.292534],
[86.019659, 44.298868],
[86.041054, 44.301735],
[86.037406, 44.302276],
[86.018186, 44.338019],
[86.071530, 44.307573],
[86.016626, 44.332252],
[86.0584833,44.299071],
[86.112303, 44.290558],
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
        //0~4 normal 5~9 home 10~14 work 15~19 school 20~24 eating  25~29 entainment 30~34 hospital 35~39 library
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
        {
          type: "simple-marker",
          color: [192, 192, 192], // working normal
          outline: {
            color: [124,252,0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working  level 1
          outline: {
            color: [124,252,0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 2
          outline: {
            color: [124,252,0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 3
          outline: {
            color: [124,252,0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [124,252,0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [192, 192, 192], // working 4
          outline: {
            color: [150, 250, 255],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working 4
          outline: {
            color: [150, 250, 255],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 4
          outline: {
            color: [150, 250, 255],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 4
          outline: {
            color: [150, 250, 255],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [150, 250, 255],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [192, 192, 192], // working 4
          outline: {
            color: [255, 200, 50],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working 4
          outline: {
            color: [255, 200, 50],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 4
          outline: {
            color: [255, 200, 50],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 4
          outline: {
            color: [255, 200, 50],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [255, 200, 50],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [192, 192, 192], // working 4
          outline: {
            color: [100, 50, 150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working 4
          outline: {
            color: [100, 50, 150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 4
          outline: {
            color: [100, 50, 150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 4
          outline: {
            color: [100, 50, 150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [100, 50, 150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [192, 192, 192], // working 4
          outline: {
            color: [160, 82, 45],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working 4
          outline: {
            color: [160, 82, 45],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 4
          outline: {
            color: [160, 82, 45],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 4
          outline: {
            color: [160, 82, 45],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [160, 82, 45],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [192, 192, 192], // working 4
          outline: {
            color: [255, 255, 0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working 4
          outline: {
            color: [255, 255, 0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 4
          outline: {
            color: [255, 255, 0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 4
          outline: {
            color: [255, 255, 0],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [255, 255, 0],
            width: 2,
          },
        },
                {
          type: "simple-marker",
          color: [192, 192, 192], // working 4
          outline: {
            color: [50,100,150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 192, 203], // working 4
          outline: {
            color: [50,100,150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [250, 128, 114], // working 4
          outline: {
            color: [50,100,150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 255], // working 4
          outline: {
            color: [50,100,150],
            width: 2,
          },
        },
        {
          type: "simple-marker",
          color: [255, 0, 0], // working 4
          outline: {
            color: [50,100,150],
            width: 2,
          },
        },
      ],
      moving: null,
      moveLayer: null,
      peopleMove: [],
      peopleMoveTime: [],
      peopleMoveStay: [],
      peopleMoveStatus: [],
      peopleAttributes: [],
      peopleInformation:[],
      // 移动图层
    };
  },
  created() {
    // const pointnumbers = 3; // 生成的路径数量+1
    // for (let i = 0; i < pointnumbers; i++) {
    //   this.getPaths(this.positions);
    // }
    tempthis = this;
    // console.log(this.paths[0]);
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
        // console.log(360 / 17319538.35239651) //17319538.35239651
        var tempList = [e.mapPoint.longitude,e.mapPoint.latitude]
        listPoints.push(tempList)
        if(listPoints.length >= 10){
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
      var getPathBtn = document.getElementById("getPathBtn");
      this.view.ui.add(startBtn, "top-right");
      this.view.ui.add(pauseBtn, "top-right");
      this.view.ui.add(showPathBtn, "top-right");
      this.view.ui.add(disPathBtn, "top-right");
      this.view.ui.add(getPathBtn, "top-right");

      getPathBtn.onclick = function () {//随机生成行为模式
        var t = Math.random()* 10
        if(t > 6){
          tempthis.getPathWithParttern("A");
        }else if(t >4){
          tempthis.getPathWithParttern("B");
        }else if(t > 2){
          tempthis.getPathWithParttern("C");
        }else{
          tempthis.getPathWithParttern("D");
        }
        var a= 0,b=0,c=0,d=0
        
        tempthis.peopleInformation.forEach(element => {
          if(element =="A"){
            a++
          }else if(element =="B"){
            b++
          }else if(element =="C"){
            c++
          }else if(element =="D"){
            d++
          }
        });
        console.log("目前共有"+(a+b+c+d)+"人."+"其中工人:" + a+"位，学生: "+b+"位，退休人:"+c+"位，乱走人:" + d+"位")
      };
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
         var tempAttribute = tempthis.peopleAttributes[i]
         let ismask,health,sex
         if(tempAttribute.isMask ==1){ //显示当前轨迹所代表的人员的信息
            ismask="佩戴了口罩"
         }else{
           ismask="没有佩戴口罩"
         }
         if(tempAttribute.HealthStatus == 1){
           health="健康状况良好"
         }else{
           health="健康状态不佳"
         }
         if(tempAttribute.Sex == 0){
           sex = "女性"
         }else{
           sex ="男性"
         }
         let tempText = "此人是一名" + tempAttribute.Profession+ "，此人" + ismask+ ",年龄是" + tempAttribute.Age + "，此人的性别是" + sex + "，此人的" +health
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
            Name: "这是第" + i + "个路径",
            Description: tempText,
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
        // PathsGraphicesLayer.removeAll();
        console.log(tempthis.longPath);
        console.log(tempthis.peopleMoveStay);
        console.log(tempthis.peopleMoveTime);
        console.log(tempthis.peopleMoveStatus);
        console.log(tempthis.peopleAttributes)
        //         tempthis.initAllPoints();
        // tempthis.updateGraphic();
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
    initAllPoints() {//初始化所有点，为longPath中的每条路径生成初始位置以及其对应的信息
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
    updateGraphic() { //整个动画的行为逻辑:移除之前所有的点，更新所有点的信息，更新所有点的状态，重新绘制所有的点
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
    updateStatus() {//大致逻辑，需要分别判断是否是最高等级的密接（才有传染力），交通工具是否为步行，以及根据不同的属性来设置感染的概率
      for (let i = 0; i < this.longPath.length; i++) {
        for (let j = 1; j < this.longPath.length; j++) {
          if(this.peopleMoveStatus[i][this.peopleMove[i].start] == 1){
            if (this.peopleMove[i].stat >= 3 && this.peopleMove[j].stat < 3) {
            if (i != j) {
              if (
                0.001 >=
                  Math.sqrt(
                    (this.peopleGra[i].geometry.longitude -
                      this.peopleGra[j].geometry.longitude) *
                      (this.peopleGra[i].geometry.longitude -
                        this.peopleGra[j].geometry.longitude) +
                      (this.peopleGra[i].geometry.latitude -
                        this.peopleGra[j].geometry.latitude) *
                        (this.peopleGra[i].geometry.latitude -
                          this.peopleGra[j].geometry.latitude)
                  ) 
                // 用以减慢传染速度
              ) {
                let randVal = 25
               if(this.peopleAttributes[i].isMask == 0){
                 randVal-=5
               }
               if(this.peopleAttributes[i].HealthStatus == 0){
                 randVal-=15
               }
               if(Math.floor(Math.random() * 35) >= randVal){
                this.peopleMove[j].stat++;
                console.log("增加了传染者" + this.peopleMove[j].stat);
               }
              }
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
          this.peopleGra[i].symbol = this.simpleMarkerSymbol[this.peopleMove[i].stat];
          continue;
        }
        if (this.peopleMoveStay[i][this.peopleMove[i].start] == 0) {
          var startX = this.longPath[i][this.peopleMove[i].start][0];
          var startY = this.longPath[i][this.peopleMove[i].start][1];
          var endX = this.longPath[i][this.peopleMove[i].end][0];
          var endY = this.longPath[i][this.peopleMove[i].end][1];
          var p = (endX - startX) / (endY - startY);
          var v = 0.00015;
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
                ? (newY = this.peopleGra[i].geometry.latitude + v * 0.5)
                : (newY = this.peopleGra[i].geometry.latitude - v * 0.5);
              newX = this.peopleGra[i].geometry.longitude;
            } else {
              if (endX < startX) {
                newX =
                  this.peopleGra[i].geometry.longitude - (1 / Math.sqrt(1 + p * p)) * v;
                newY =
                  this.peopleGra[i].geometry.latitude -
                  (p / Math.sqrt(1 + p * p)) * v * 0.5;
              } else {
                newX =
                  this.peopleGra[i].geometry.longitude + (1 / Math.sqrt(1 + p * p)) * v;
                newY =
                  this.peopleGra[i].geometry.latitude +
                  (p / Math.sqrt(1 + p * p)) * v * 0.5;
              }
            }
            if (
              (this.peopleGra[i].geometry.longitude - endX) * (newX - endX) <= 0 ||
              (this.peopleGra[i].geometry.latitude - endY) * (newY - endY) <= 0
            ) {
              // this.peopleGra[i].geometry.longitude = endX;
              // this.peopleGra[i].geometry.type = "point";
              // this.peopleGra[i].geometry.latitude = endY;
              // this.peopleGra[i].symbol = this.simpleMarkerSymbol[this.peopleMove[i].stat];
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
              // this.peopleGra[i].geometry.type = "point"
              // this.peopleGra[i].geometry.latitude = newY;
              // this.peopleGra[i].symbol = this.simpleMarkerSymbol[this.peopleMove[i].stat];
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
        } else {
          var status = this.peopleMoveStatus[i][this.peopleMove[i].start];
          if (status >= 10) {
            if (status == 10) {
              this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[5 + this.peopleMove[i].stat],
              });
            } else if (status == 11) {
              this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[10 + this.peopleMove[i].stat],
              });
            } else if (status == 12) {
              this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[15 + this.peopleMove[i].stat],
              });
            } else if (status == 13) {
              this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[20 + this.peopleMove[i].stat],
              });
            } else if (status == 14) {
              this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[25 + this.peopleMove[i].stat],
              });
            } else if (status == 15) {
              this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[30 + this.peopleMove[i].stat],
              });
            }else if(status == 16){
                            this.peopleGra[i] = new Graphic({
                geometry: {
                  type: "point",
                  longitude: this.peopleGra[i].geometry.longitude,
                  latitude: this.peopleGra[i].geometry.latitude,
                },
                symbol: this.simpleMarkerSymbol[35 + this.peopleMove[i].stat],
              });
            }
          }
          if (this.peopleMoveStay[i][this.peopleMove[i].start] > 1000) {
            this.peopleMoveStay[i][this.peopleMove[i].start] -= 20;
          } else {
            this.peopleMoveStay[i][this.peopleMove[i].start]--;
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
    getOnePath(type, pointnumbers) {
      if (type == "single") {
        this.getPaths(this.positions);
      } else {
        for (var i = 0; i < pointnumbers; i++) {
          var r = Math.floor(Math.random() * 4);
        }
        //TODO: 随机生成行为模式
        //TODO: 根据行为模式，依次获取并拼接分段路径

        //A: 工人  从家里出发去工作，工作完外出吃饭，吃完饭回家。在吃完饭后有一定可能前往娱乐场所后再回家。如果两点间距很远，则有很大可能选择自驾车。
        //基本戴口罩，90%接种疫苗，年龄在20~50之间。
        //B: 学生 从家中出发去上学，随后放学回家。回家时有较小可能去吃饭，然后再回家。几乎不去娱乐场所。交通方式一般选择步行.
        //几乎全员戴口罩，接种疫苗、年龄在12~25之间.
        //C: 退休人 从家中出发去公园或者娱乐场所，随后再次出发前往另一个公园、娱乐场所。每个场所停留的时间较短，不太可能在去吃饭。有可能会前往医院。交通方式一般是步行。
        //25%戴口罩,25%接种疫苗,年龄在 60~80之间。
        //D: 乱走人 从家中出发，在娱乐场所和吃饭场所之间交流，不一定回家。距离较远可能会选择驾车。
        //几乎不带口罩,50%接种疫苗,年龄在18 ~ 40之间.
      }
    },
    async getPathWithTimelineAndStay(start, end, startTime, speed, startClass, endClass) {
      var tempPath = await this.sendRequest(start, end);
      var [tempPathTimeline, lastTime] = this.getTimeLineWithPath(
        tempPath,
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate(),
        startTime.getHours(),
        startTime.getMinutes(),
        startTime.getSeconds(),
        speed
      );
      var anspath = tempPath;
      var anstimeline = tempPathTimeline;
      var ansstaytime = this.getStayTimeWithPath(tempPath, speed);
      var ansStatus = this.getStatusWithPath(tempPath, startClass, endClass,speed);
      return [anspath, anstimeline, ansstaytime, ansStatus, lastTime];
    },
    getStatusWithWord(word) {
      console.log(word)
      if (word == "home") {
        return 10;
      } else if (word == "work") {
        return 11;
      } else if (word == "school") {
        return 12;
      } else if (word == "eating") {
        return 13;
      } else if (word == "entertainment") {
        return 14;
      } else if (word == "hospital") {
        return 15;
      } else if(word =="library"){
        return 16;
      }else{
        return 0
      }
    },
    getStatusWithPath(path, startClass, endClass,speed) {
      var ansStatus = [];
      var actionVal
      if(speed == 5){
        actionVal = 2 //开车
      }else{
        actionVal = 1 //步行
      }
      for (var i = 0; i < path.length; i++) {
        ansStatus.push(actionVal);
      }
      var sc, ec;
      sc = this.getStatusWithWord(startClass);
      ec = this.getStatusWithWord(endClass);
      ansStatus[0] = sc;
      ansStatus[path.length - 1] = ec;
      return ansStatus;
    },
    getStayTimeWithPath(path, speed) {
      var ansStayTime = [];
      if (speed == 5) {
        var stayVal = 0;
      } else {
        var stayVal = 5;
      }
      for (var i = 0; i < path.length; i++) {
        ansStayTime.push(stayVal);
      }
      return ansStayTime;
    },
    getTimeLineWithPath(
      path,
      startYear,
      startMouth,
      startDay,
      startHour,
      startMin,
      startSecond,
      speed
    ) {
      let year = startYear,
        month = startMouth,
        day = startDay,
        hour = startHour,
        min = startMin,
        second = startSecond;
      var first =
        startYear +
        "." +
        startMouth +
        "." +
        startDay +
        " " +
        startHour +
        ":" +
        startMin +
        ":" +
        startSecond;
      var ans = [];
      ans.push(first);
      var step;
      var tempP = 1;
      if (speed == 5) {
        step = 1.25;
      } else if (speed == 0) {
        step = 12.5;
      }
      console.log(path.length);
      for (var i = 0; i < path.length - 1; i++) {
        if (path[i][0] == path[tempP][0] && path[i][1] == path[tempP][1]) {
          tempP++;
          ans.push(
            year + "." + month + "." + day + " " + hour + ":" + min + ":" + second
          );
          continue;
        }
        var longitudeGap = Math.abs(path[i][0] - path[tempP][0]);
        var latitudeGap = Math.abs(path[i][1] - path[tempP][1]);
        var metreGapWithLongitude = longitudeGap * 47840;
        var metreGaoWithLatitude = latitudeGap * 110000;
        var distance = Math.sqrt(
          metreGapWithLongitude * metreGapWithLongitude +
            metreGaoWithLatitude * metreGaoWithLatitude
        ).toFixed(2);
        var timeWithSecond = distance / step;
        var d = new Date(
          Date.parse(new Date(year, month, day, hour, min, second, 0)) +
            timeWithSecond * 1000
        );

        year = d.getFullYear();
        month = d.getMonth();
        day = d.getDate();
        hour = d.getHours();
        min = d.getMinutes();
        second = d.getSeconds();
        ans.push(
          d.getFullYear() +
            "." +
            d.getMonth() +
            "." +
            d.getDate() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds()
        );
        tempP++;
      } //0.0005 0.00135
      var lastTime = new Date(year, month, day, hour, min, second, 0);
      return [ans, lastTime];
    }, //"86.023563,44.314909  86.023064,44.316259"
    getDistanceWithLL(pointA, pointB) {
      var x = Math.abs(pointA[0] - pointB[0]);
      var y = Math.abs(pointA[1] - pointB[1]);
      var mx = x * 47840;
      var my = y * 110000;
      return Math.sqrt(mx * mx + my * my);
    },
    async getPathWithParttern(parttern) {
      if (parttern == "A") {
        console.log("A!")
        this.peopleInformation.push("A")
        var randomHome = this.HousePositions[
          Math.floor(Math.random() * this.HousePositions.length)
        ];
        var randomWorkplace = this.workPositions[
          Math.floor(Math.random() * this.workPositions.length)
        ];
        var speed = 0;
        if (this.getDistanceWithLL(randomHome, randomWorkplace) > 3000) {
          if (Math.random() * 10 > 8) {
            speed = 5;
          }
        }
        var firstlastTime;
        var startDate = new Date(2022, 1, 9, 7, 14, 22, 0);
        var stayAtFirst;
        if (Math.random() * 10 > 5) {
          stayAtFirst = Math.floor(Math.random() * 1000);
        } else {
          stayAtFirst = 0;
        }
        startDate = new Date(Date.parse(startDate) + (stayAtFirst / 4) * 6 * 1000);
        var [
          firstPath,
          firstPathTimeLine,
          firstPathStayTime,
          firstPathStatus,
          firstlastTime,
        ] = await this.getPathWithTimelineAndStay(
          randomHome,
          randomWorkplace,
          startDate,
          speed,
          "home",
          "work"
        );
        firstPathStayTime[0] = stayAtFirst;
        var stayTime = Math.floor(Math.random() * 9600);
        firstPathStayTime[firstPathStayTime.length - 1] = stayTime;
        var secondStartTime = new Date(
          Date.parse(firstlastTime) + (stayTime / 4) * 6 * 1000
        );
        var isEating = Math.floor(Math.random() * 10);
        if (isEating > 8) {
          var EatingPosition = this.EatingPositions[
            Math.floor(Math.random() * this.EatingPositions.length)
          ];
          var eatingPath, eatinglastTime, eatingPathTimeLine, eatingPathStayTime;
          var speed = 0;
          if (this.getDistanceWithLL(EatingPosition, randomWorkplace) > 2000) {
            if (Math.random() * 7 > 4) {
              speed = 5;
            }
          }
          [
            eatingPath,
            eatingPathTimeLine,
            eatingPathStayTime,
            eatingPathStatus,
            eatinglastTime,
          ] = await this.getPathWithTimelineAndStay(
            randomWorkplace,
            EatingPosition,
            secondStartTime,
            speed,
            "work",
            "eating"
          );
          var entertainmentPosition = this.entertainmentPositions[
            Math.floor(Math.random() * this.entertainmentPositions.length)
          ];
          var entertainmentPath,
            entertainmentlastTime,
            entertainmentPathTimeLine,
            entertainmentPathStayTime;
          var speed = 0;
          if (this.getDistanceWithLL(entertainmentPosition, randomWorkplace) > 3000) {
            if (Math.random() * 7 > 4) {
              speed = 5;
            }
          }
          var [
            entertainmentPath,
            entertainmentPathTimeLine,
            entertainmentPathStayTime,
            entertainmentPathStatus,
            entertainmentlastTime,
          ] = await this.getPathWithTimelineAndStay(
            randomWorkplace,
            entertainmentPosition,
            secondStartTime,
            "work",
            "entertainment"
          );
          var stayTime = Math.floor(Math.random() * 1800);
          var gohomeStartTime = new Date(
            Date.parse(entertainmentlastTime) + (stayTime / 4) * 6 * 1000
          );
          entertainmentPathStayTime[entertainmentPathStayTime.length - 1] = stayTime;

          var gohomePath, speed, gohomelastTime, gohomeTimeline, gohomePathStayTime;
          var speed = 0;
          if (this.getDistanceWithLL(entertainmentPosition, randomHome) > 3000) {
            if (Math.random() * 7 > 4) {
              speed = 5;
            }
          }
          var [
            gohomePath,
            gohomeTimeline,
            gohomePathStayTime,
            gohomeStatus,
            gohomelastTime,
          ] = await this.getPathWithTimelineAndStay(
            entertainmentPosition,
            randomHome,
            gohomeStartTime,
            speed,
            "entertainment",
            "home"
          );
          var allTempPath = [],
            allTimeline = [],
            allStayTime = [],
            allStatus = [];
          allTempPath.push(...firstPath);
          allTempPath.push(...entertainmentPath);
          allTempPath.push(...gohomePath);
          allTimeline.push(...firstPathTimeLine);
          allTimeline.push(...entertainmentPathTimeLine);
          allTimeline.push(...gohomeTimeline);
          allStayTime.push(...firstPathStayTime);
          allStayTime.push(...entertainmentPathStayTime);
          allStayTime.push(...gohomePathStayTime);
          allStatus.push(...firstPathStatus);
          allStatus.push(...entertainmentPathStatus);
          allStatus.push(...gohomeStatus);
          this.longPath.push(allTempPath);
          this.peopleMoveTime.push(allTimeline);
          this.peopleMoveStay.push(allStayTime);
          this.peopleMoveStatus.push(allStatus);
        } else if (isEating > 5) {
          var EatingPosition = this.EatingPositions[
            Math.floor(Math.random() * this.EatingPositions.length)
          ];
          var eatingPath, eatinglastTime, eatingPathTimeLine, eatingPathStayTime;
          var speed = 0;
          if (this.getDistanceWithLL(EatingPosition, randomWorkplace) > 5000) {
            if (Math.random() * 7 > 4) {
              speed = 5;
            }
          }
          var [
            eatingPath,
            eatingPathTimeLine,
            eatingPathStayTime,
            eatingPathStatus,
            eatinglastTime,
          ] = await this.getPathWithTimelineAndStay(
            randomWorkplace,
            EatingPosition,
            secondStartTime,
            speed,
            "work",
            "eating"
          );
          var stayTime = Math.floor(Math.random() * 1000);
          eatingPathStayTime[eatingPathStayTime.length - 1] = stayTime;
          var gohomeStartTime = new Date(
            Date.parse(eatinglastTime) + (stayTime / 4) * 6 * 1000
          );
          var gohomePath, speed, gohomelastTime, gohomeTimeline, gohomePathStayTime;
          var speed = 0;
          if (this.getDistanceWithLL(EatingPosition, randomHome) > 3000) {
            if (Math.random() * 7 > 4) {
              speed = 5;
            }
          }
          [
            gohomePath,
            gohomeTimeline,
            gohomePathStayTime,
            gohomeStatus,
            gohomelastTime,
          ] = await this.getPathWithTimelineAndStay(
            EatingPosition,
            randomHome,
            gohomeStartTime,
            speed,
            "eating",
            "home"
          );
          var allTempPath = [],
            allTimeline = [],
            allStayTime = [],
            allStatus = [];
          allTempPath.push(...firstPath);
          allTempPath.push(...eatingPath);
          allTempPath.push(...gohomePath);
          allTimeline.push(...firstPathTimeLine);
          allTimeline.push(...eatingPathTimeLine);
          allTimeline.push(...gohomeTimeline);
          allStayTime.push(...firstPathStayTime);
          allStayTime.push(...eatingPathStayTime);
          allStayTime.push(...gohomePathStayTime);
          allStatus.push(...firstPathStatus);
          allStatus.push(...eatingPathStatus);
          allStatus.push(...gohomeStatus);
          this.longPath.push(allTempPath);
          this.peopleMoveTime.push(allTimeline);
          this.peopleMoveStay.push(allStayTime);
          this.peopleMoveStatus.push(allStatus);
        } else {
          var gohomePath, speed, gohomelastTime, gohomeTimeline, gohomePathStayTime;
          var speed = 0;
          if (this.getDistanceWithLL(randomWorkplace, randomHome) > 3000) {
            if (Math.random() * 7 > 4) {
              speed = 5;
            }
          }
          var [
            gohomePath,
            gohomeTimeline,
            gohomePathStayTime,
            gohomeStatus,
            gohomelastTime,
          ] = await this.getPathWithTimelineAndStay(
            randomWorkplace,
            randomHome,
            secondStartTime,
            speed,
            "work",
            "home"
          );
          var allTempPath = [],
            allTimeline = [],
            allStayTime = [],
            allStatus = [];
          allTempPath.push(...firstPath);
          allTempPath.push(...gohomePath);
          allTimeline.push(...firstPathTimeLine);
          allTimeline.push(...gohomeTimeline);
          allStayTime.push(...firstPathStayTime);
          allStayTime.push(...gohomePathStayTime);
          allStatus.push(...firstPathStatus);
          allStatus.push(...gohomeStatus);
          this.longPath.push(allTempPath);
          this.peopleMoveTime.push(allTimeline);
          this.peopleMoveStay.push(allStayTime);
          this.peopleMoveStatus.push(allStatus);
        }
        this.peopleAttributes.push(this.getRandomAttribute("A"));
      } else if (parttern == "B") {
        console.log("B!!!")
        this.peopleInformation.push("B")
        var randomHome = this.HousePositions[
          Math.floor(Math.random() * this.HousePositions.length)
        ];
        var randomSchool = this.midSchoolPositsions[
          Math.floor(Math.random() * this.midSchoolPositsions.length)
        ];
        var speed = 0;
        if (this.getDistanceWithLL(randomHome, randomSchool) > 3000) {
          if (Math.random() * 10 > 8) {
            speed = 5;
          }
        }
        var firstlastTime;
        var startDate = new Date(2022, 1, 9, 7, 14, 22, 0);
        var stayAtFirst;
        if (Math.random() * 10 > 7) {
          stayAtFirst = Math.floor(Math.random() * 300);
        } else {
          stayAtFirst = 0;
        }
        startDate = new Date(Date.parse(startDate) + (stayAtFirst / 4) * 6 * 1000);
        var [
          firstPath,
          firstPathTimeLine,
          firstPathStayTime,
          firstPathStatus,
          firstlastTime,
        ] = await this.getPathWithTimelineAndStay(
          randomHome,
          randomSchool,
          startDate,
          speed,
          "home",
          "school"
        );
        firstPathStayTime[0] = stayAtFirst;
        var stayTime = Math.floor(Math.random() * 20000);
        if (stayTime < 5000) {
          stayTime += 5000;
        }
        firstPathStayTime[firstPathStayTime.length - 1] = stayTime;
        var secondStartTime = new Date(
          Date.parse(firstlastTime) + (stayTime / 4) * 6 * 1000
        );
        var tempLastPosition = randomSchool;
        var tempStartTime = secondStartTime
        var templastClass = "school"
        var secondPath = [],
          secondPathTimeLine = [],
          secondPathStayTime = [],
          secondPathStatus = [],
          secondLastTime
        while (Math.random() * 10 > 7) {
          isEating = Math.random() * 10;
          if (isEating > 5) {
            var tempEatingPosition = this.EatingPositions[
              Math.floor(Math.random() * this.EatingPositions.length)
            ];
            var  tempspeed = 0;
            if (this.getDistanceWithLL(tempLastPosition, tempEatingPosition) > 3000) {
              if (Math.random() * 10 > 8) {
                tempspeed = 5;
              }
            }
            var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempLastPosition,
              tempEatingPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "eating"
            )
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
            templastClass = "eating"
            tempLastPosition = tempEatingPosition
            var tempstayTime = Math.floor(Math.random() * 1800);
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
          }else{
            var tempEntertainmentPosition = this.entertainmentPositions[
              Math.floor(Math.random() * this.entertainmentPositions.length)
            ];
            var  tempspeed = 0;
            if (this.getDistanceWithLL(tempLastPosition, tempEntertainmentPosition) > 3000) {
              if (Math.random() * 10 > 8) {
                tempspeed = 5;
              }
            }
            var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempLastPosition,
              tempEntertainmentPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "entertainment"
            )
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
            templastClass = "entertainment"
            tempLastPosition = tempEntertainmentPosition
            var tempstayTime = Math.floor(Math.random() * 1800);
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
          }
        }
        var gohomespeed = 0
        if (this.getDistanceWithLL(randomHome, randomSchool) > 3000) {
          if (Math.random() * 10 > 8) {
            gohomespeed = 5;
          }
        }
        var [
          gohomePath,
          gohomeTimeLine,
          gohomeStayTime,
          gohomeStatus,
          gohomelastTime,
        ] = await this.getPathWithTimelineAndStay(
          tempLastPosition,
          randomHome,
          tempStartTime,
          gohomespeed,
          templastClass,
          "home"
        );
        var allTempPath = [],
            allTimeline = [],
            allStayTime = [],
            allStatus = [];
          allTempPath.push(...firstPath);
          for(let i = 0;i<secondPath.length;i++){
            allTempPath.push(...secondPath[i])
          }
          allTempPath.push(...gohomePath);
          allTimeline.push(...firstPathTimeLine);
          for(let i = 0;i<secondPathTimeLine.length;i++){
            allTimeline.push(secondPathTimeLine[i])
          }
          allTimeline.push(...gohomeTimeLine);
          allStayTime.push(...firstPathStayTime);
          for(let i = 0;i<secondPathStayTime.length;i++){
            allStayTime.push(...secondPathStayTime[i])
          }
          allStayTime.push(...gohomeStayTime);
          allStatus.push(...firstPathStatus);
          for(let i = 0;i<secondPathStatus.length;i++){
            allStatus.push(...secondPathStatus[i])
          }
          allStatus.push(...gohomeStatus);
          this.longPath.push(allTempPath);
          this.peopleMoveTime.push(allTimeline);
          this.peopleMoveStay.push(allStayTime);
          this.peopleMoveStatus.push(allStatus);
          this.peopleAttributes.push(this.getRandomAttribute("B"))
      } else if (parttern == "C") {
        console.log("C!!!")
        this.peopleInformation.push("C")
        var randomHome = this.HousePositions[
          Math.floor(Math.random() * this.HousePositions.length)
        ];
        var startDate = new Date(2022, 1, 9, 7, 24, 22, 0);
        var stayAtFirst;
        if (Math.random() * 10 > 7) {
          stayAtFirst = Math.floor(Math.random() * 2000);
        } else {
          stayAtFirst = 0;
        }
        var tempStartTime = new Date(Date.parse(startDate) + (stayAtFirst / 4) * 6 * 1000);
        var tempStartPosition = randomHome;
        var tempEndPosition ,templastClass = "home"
        var isNext = 9
        var secondPath = [],
          secondPathTimeLine = [],
          secondPathStayTime = [],
          secondPathStatus = [],
          secondLastTime
          
        while(isNext > 5){
          var random = Math.random() * 10
          if(random > 7){ //library
            tempEndPosition = this.libraryPositions[
              Math.floor(Math.random() * this.libraryPositions.length)
            ];
          var tempspeed = 0;
         
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 8) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "library"
            )
            var tempstayTime = Math.floor(Math.random() * 5000);
            if(stayAtFirst >0){
              tempansPathStayTime[0] = stayAtFirst;
            }
            stayAtFirst = -1
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "library"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }else if (random> 5){ //hosptial 
            tempEndPosition = this.HospitalPositins[
              Math.floor(Math.random() * this.HospitalPositins.length)
            ];
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 8) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "hospital"
            )
            var tempstayTime = Math.floor(Math.random() * 5000);
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "hospital"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }else if(random > 3){
              tempEndPosition = this.entertainmentPositions[
              Math.floor(Math.random() * this.entertainmentPositions.length)
            ];
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 8) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "entertainment"
            )

            var tempstayTime = Math.floor(Math.random() * 3500);
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "entertainment"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }else {
                          tempEndPosition = this.EatingPositions[
              Math.floor(Math.random() * this.EatingPositions.length)
            ];
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 8) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "eating"
            )

            var tempstayTime = Math.floor(Math.random() * 3000);
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "eating"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }
          isNext = Math.random() * 10
        }
        tempEndPosition = randomHome
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 8) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "home"
            )
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
            var tempstayTime = Math.floor(Math.random() * 3000);
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "home"
        var allTempPath = [],
            allTimeline = [],
            allStayTime = [],
            allStatus = [];
          for(let i = 0;i<secondPath.length;i++){
            allTempPath.push(...secondPath[i])
          }
          for(let i = 0;i<secondPathTimeLine.length;i++){
            allTimeline.push(secondPathTimeLine[i])
          }
          for(let i = 0;i<secondPathStayTime.length;i++){
            allStayTime.push(...secondPathStayTime[i])
          }
          for(let i = 0;i<secondPathStatus.length;i++){
            allStatus.push(...secondPathStatus[i])
          }
          this.longPath.push(allTempPath);
          this.peopleMoveTime.push(allTimeline);
          this.peopleMoveStay.push(allStayTime);
          this.peopleMoveStatus.push(allStatus);
          this.peopleAttributes.push(this.getRandomAttribute("C"))
      } else {
        console.log("D!!!")
         this.peopleInformation.push("D")
        var randomHome = this.HousePositions[
          Math.floor(Math.random() * this.HousePositions.length)
        ];
        var startDate = new Date(2022, 1, 9, 7, 24, 22, 0);
        var stayAtFirst;
        if (Math.random() * 10 > 2) {
          stayAtFirst = Math.floor(Math.random() * 8000);
        } else {
          stayAtFirst = 0;
        }
        var tempStartTime = new Date(Date.parse(startDate) + (stayAtFirst / 4) * 6 * 1000);
        var tempStartPosition = randomHome;
        var tempEndPosition ,templastClass = "home"
        var isNext = 9
        var secondPath = [],
          secondPathTimeLine = [],
          secondPathStayTime = [],
          secondPathStatus = [],
          secondLastTime
          
        while(isNext > 3){
          var random = Math.random() * 10
          if(random > 8){ //library
            tempEndPosition = this.libraryPositions[
              Math.floor(Math.random() * this.libraryPositions.length)
            ];
          var tempspeed = 0;
         
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 4) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "library"
            )
            var tempstayTime = Math.floor(Math.random() * 5000);
            if(stayAtFirst >0){
              tempansPathStayTime[0] = stayAtFirst;
            }
            stayAtFirst = -1
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "library"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }else if (random>4 ){ //entertainmentPositions
            tempEndPosition = this.entertainmentPositions[
              Math.floor(Math.random() * this.entertainmentPositions.length)
            ];
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 4) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "entertainment"
            )
            var tempstayTime = Math.floor(Math.random() * 5000);
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "entertainment"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }else{
              tempEndPosition = this.EatingPositions[
              Math.floor(Math.random() * this.EatingPositions.length)
            ];
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 >4) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "eating"
            )
            var tempstayTime = Math.floor(Math.random() * 3500);
            tempansPathStayTime[tempansPathStayTime.length - 1] = tempstayTime;
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "eating"
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
          }
          isNext = Math.random() * 10
        }
        tempEndPosition = randomHome
          var tempspeed = 0;
          if (this.getDistanceWithLL(tempStartPosition, tempEndPosition) > 3000) {
            if (Math.random() * 10 > 8) {
              tempspeed = 5;
            }
          }
          var [
              tempansPath,
              tempansPathTimeLine,
              tempansPathStayTime,
              tempansPathStatus,
              templastTime,
            ] = await this.getPathWithTimelineAndStay(
              tempStartPosition,
              tempEndPosition,
              tempStartTime,
              tempspeed,
              templastClass,
              "home"
            )
            secondPath.push(tempansPath)
            secondPathTimeLine.push(tempansPathTimeLine)
            secondPathStayTime.push(tempansPathStayTime)
            secondPathStatus.push(tempansPathStatus)
            var tempstayTime = Math.floor(Math.random() * 3000);
            tempStartTime  = new Date(
            Date.parse(templastTime) + (tempstayTime / 4) * 6 * 1000);
            tempStartPosition = tempEndPosition
            templastClass = "home"
        var allTempPath = [],
            allTimeline = [],
            allStayTime = [],
            allStatus = [];
          for(let i = 0;i<secondPath.length;i++){
            allTempPath.push(...secondPath[i])
          }
          for(let i = 0;i<secondPathTimeLine.length;i++){
            allTimeline.push(secondPathTimeLine[i])
          }
          for(let i = 0;i<secondPathStayTime.length;i++){
            allStayTime.push(...secondPathStayTime[i])
          }
          for(let i = 0;i<secondPathStatus.length;i++){
            allStatus.push(...secondPathStatus[i])
          }
          this.longPath.push(allTempPath);
          this.peopleMoveTime.push(allTimeline);
          this.peopleMoveStay.push(allStayTime);
          this.peopleMoveStatus.push(allStatus);
          this.peopleAttributes.push(this.getRandomAttribute("D"))
      }
    },
    getRandomAttribute(type) {
      var mask,sex,age,profession,health
      if(type == "A"){
        if(Math.random() * 10 > 2){
          mask = 1
        }else{
          mask = 0
        }
        if(Math.random() * 10 > 4){
          sex = 0
        }else{
          sex = 1
        }
        age =Math.floor(Math.random() * 60)
        if(age < 19){
          age +=19
        }
        profession = "工人"
        if(Math.random() * 10 > 3){
          health = 1
        }else{
          health = 0
        }
      }else if(type =="B"){
        if(Math.random() * 10 > 3){
          mask = 1
        }else{
          mask = 0
        }
        if(Math.random() * 10 >5 ){
          sex = 0
        }else{
          sex = 1
        }
        age =Math.floor( Math.random() * 20)
        if(age < 7){
          age +=7
        }
        profession = "学生"
        if(Math.random() * 10 > 2){
          health = 1
        }else{
          health = 0
        }
      }else if(type == "C"){
        if(Math.random() * 10 > 5){
          mask = 1
        }else{
          mask = 0
        }
        if(Math.random() * 10 >5 ){
          sex = 0
        }else{
          sex = 1
        }
        age =Math.floor(Math.random() * 80)
        if(age < 45){
          age +=45
        }
        profession = "退休者"
        if(Math.random() * 10 >5 ){
          health = 1
        }else{
          health = 0
        }
      }else if(type == "D"){
        if(Math.random() * 10 > 6){
          mask = 1
        }else{
          mask = 0
        }
        if(Math.random() * 10 >5 ){
          sex = 0
        }else{
          sex = 1
        }
        age = Math.floor(Math.random() * 66)
        if(age < 15){
          age +=15
        }
        profession = "乱走人"
        if(Math.random() * 10 > 4){
          health = 1
        }else{
          health = 0
        }
      }
      var peopleAttribute ={
          isMask : mask,
          Sex : sex,
          Age: age,
          Profession: profession,
          HealthStatus: health
        }
      return peopleAttribute
    },
    async sendRequest(start, end) {
      var temppaths = new Array();
      var temppath;
      return await axios
        .get(
          "https://restapi.amap.com/v3/direction/walking?origin=" +
            start +
            "&destination=" +
            end +
            "&&key=051b74eefaa0e56e8d7ad11b11b96d2b",
          {}
        )
        .then((res) => {
          console.log(res.data.route.paths[0]);
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
          });
          // console.log(temppaths);
          var templongpath = new Array();
          for (let j = 0; j < temppaths.length; j++) {
            for (let k = 0; k < temppaths[j].length; k++) {
              var tempa = new Array();
              tempa.push(temppaths[j][k][0]);
              tempa.push(temppaths[j][k][1]);
              templongpath.push(tempa);
            }
          }
          // this.longPath.push(templongpath);
          // console.log(templongpath)
          return templongpath;
        })
        .catch((err) => {
          console.log(err);
        });
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
    <el-button id="getPathBtn">获得路径</el-button>
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
