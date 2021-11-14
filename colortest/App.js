import React, {Component} from 'react';
//import blessed from 'blessed';
//import {render} from 'react-blessed';
import blessed from 'neo-blessed';
import {createBlessedRenderer} from 'react-blessed';
import chalk from 'chalk'
const blessedChalk = new chalk.Instance({level: 2});
const render = createBlessedRenderer(blessed);

//
// Rendering a simple centered box
function App() {
  const elements = []
  for (let i = 0; i < 256; i++) {
    elements.push(<element key={i} top={i+1}>{blessedChalk.bgAnsi256(i).bold("Eth News and Links")}</element>)
  }
    return (
      <box top="center"
           left="center"
           width="100%"
           mouse={true}
           scrollable={true}
           height="100%"
           border={{type: 'line'}}
           style={{border: {fg: 'blue'}}}>
      {blessedChalk.bgAnsi256(0).bold( "0 Eth News and Links") +
      blessedChalk.bgAnsi256(1).bold( "1 Eth News and Links") +
      blessedChalk.bgAnsi256(2).bold( "2 Eth News and Links") +
      blessedChalk.bgAnsi256(3).bold( "3 Eth News and Links") +
      blessedChalk.bgAnsi256(4).bold( "4 Eth News and Links") +
      blessedChalk.bgAnsi256(5).bold( "5 Eth News and Links") +
      blessedChalk.bgAnsi256(6).bold( "6 Eth News and Links") +
      blessedChalk.bgAnsi256(7).bold( "7 Eth News and Links") +
      blessedChalk.bgAnsi256(8).bold( "8 Eth News and Links") +
      blessedChalk.bgAnsi256(9).bold( "9 Eth News and Links") +
      blessedChalk.bgAnsi256(10).bold( "10 Eth News and Links") +
      blessedChalk.bgAnsi256(11).bold( "11 Eth News and Links") +
      blessedChalk.bgAnsi256(12).bold( "12 Eth News and Links") +
      blessedChalk.bgAnsi256(13).bold( "13 Eth News and Links") +
      blessedChalk.bgAnsi256(14).bold( "14 Eth News and Links") +
      blessedChalk.bgAnsi256(15).bold( "15 Eth News and Links") +
      blessedChalk.bgAnsi256(16).bold( "16 Eth News and Links") +
      blessedChalk.bgAnsi256(17).bold( "17 Eth News and Links") +
      blessedChalk.bgAnsi256(18).bold( "18 Eth News and Links") +
      blessedChalk.bgAnsi256(19).bold( "19 Eth News and Links") +
      blessedChalk.bgAnsi256(20).bold( "20 Eth News and Links") +
      blessedChalk.bgAnsi256(21).bold( "21 Eth News and Links") +
      blessedChalk.bgAnsi256(22).bold( "22 Eth News and Links") +
      blessedChalk.bgAnsi256(23).bold( "23 Eth News and Links") +
      blessedChalk.bgAnsi256(24).bold( "24 Eth News and Links") +
      blessedChalk.bgAnsi256(25).bold( "25 Eth News and Links") +
      blessedChalk.bgAnsi256(26).bold( "26 Eth News and Links") +
      blessedChalk.bgAnsi256(27).bold( "27 Eth News and Links") +
      blessedChalk.bgAnsi256(28).bold( "28 Eth News and Links") +
      blessedChalk.bgAnsi256(29).bold( "29 Eth News and Links") +
      blessedChalk.bgAnsi256(30).bold( "30 Eth News and Links") +
      blessedChalk.bgAnsi256(31).bold( "31 Eth News and Links") +
      blessedChalk.bgAnsi256(32).bold( "32 Eth News and Links") +
      blessedChalk.bgAnsi256(33).bold( "33 Eth News and Links") +
      blessedChalk.bgAnsi256(34).bold( "34 Eth News and Links") +
      blessedChalk.bgAnsi256(35).bold( "35 Eth News and Links") +
      blessedChalk.bgAnsi256(36).bold( "36 Eth News and Links") +
      blessedChalk.bgAnsi256(37).bold( "37 Eth News and Links") +
      blessedChalk.bgAnsi256(38).bold( "38 Eth News and Links") +
      blessedChalk.bgAnsi256(39).bold( "39 Eth News and Links") +
      blessedChalk.bgAnsi256(40).bold( "40 Eth News and Links") +
      blessedChalk.bgAnsi256(41).bold( "41 Eth News and Links") +
      blessedChalk.bgAnsi256(42).bold( "42 Eth News and Links") +
      blessedChalk.bgAnsi256(43).bold( "43 Eth News and Links") +
      blessedChalk.bgAnsi256(44).bold( "44 Eth News and Links") +
      blessedChalk.bgAnsi256(45).bold( "45 Eth News and Links") +
      blessedChalk.bgAnsi256(46).bold( "46 Eth News and Links") +
      blessedChalk.bgAnsi256(47).bold( "47 Eth News and Links") +
      blessedChalk.bgAnsi256(48).bold( "48 Eth News and Links") +
      blessedChalk.bgAnsi256(49).bold( "49 Eth News and Links") +
      blessedChalk.bgAnsi256(50).bold( "50 Eth News and Links") +
      blessedChalk.bgAnsi256(51).bold( "51 Eth News and Links") +
      blessedChalk.bgAnsi256(52).bold( "52 Eth News and Links") +
      blessedChalk.bgAnsi256(53).bold( "53 Eth News and Links") +
      blessedChalk.bgAnsi256(54).bold( "54 Eth News and Links") +
      blessedChalk.bgAnsi256(55).bold( "55 Eth News and Links") +
      blessedChalk.bgAnsi256(56).bold( "56 Eth News and Links") +
      blessedChalk.bgAnsi256(57).bold( "57 Eth News and Links") +
      blessedChalk.bgAnsi256(58).bold( "58 Eth News and Links") +
      blessedChalk.bgAnsi256(59).bold( "59 Eth News and Links") +
      blessedChalk.bgAnsi256(60).bold( "60 Eth News and Links") +
      blessedChalk.bgAnsi256(61).bold( "61 Eth News and Links") +
      blessedChalk.bgAnsi256(62).bold( "62 Eth News and Links") +
      blessedChalk.bgAnsi256(63).bold( "63 Eth News and Links") +
      blessedChalk.bgAnsi256(64).bold( "64 Eth News and Links") +
      blessedChalk.bgAnsi256(65).bold( "65 Eth News and Links") +
      blessedChalk.bgAnsi256(66).bold( "66 Eth News and Links") +
      blessedChalk.bgAnsi256(67).bold( "67 Eth News and Links") +
      blessedChalk.bgAnsi256(68).bold( "68 Eth News and Links") +
      blessedChalk.bgAnsi256(69).bold( "69 Eth News and Links") +
      blessedChalk.bgAnsi256(70).bold( "70 Eth News and Links") +
      blessedChalk.bgAnsi256(71).bold( "71 Eth News and Links") +
      blessedChalk.bgAnsi256(72).bold( "72 Eth News and Links") +
      blessedChalk.bgAnsi256(73).bold( "73 Eth News and Links") +
      blessedChalk.bgAnsi256(74).bold( "74 Eth News and Links") +
      blessedChalk.bgAnsi256(75).bold( "75 Eth News and Links") +
      blessedChalk.bgAnsi256(76).bold( "76 Eth News and Links") +
      blessedChalk.bgAnsi256(77).bold( "77 Eth News and Links") +
      blessedChalk.bgAnsi256(78).bold( "78 Eth News and Links") +
      blessedChalk.bgAnsi256(79).bold( "79 Eth News and Links") +
      blessedChalk.bgAnsi256(80).bold( "80 Eth News and Links") +
      blessedChalk.bgAnsi256(81).bold( "81 Eth News and Links") +
      blessedChalk.bgAnsi256(82).bold( "82 Eth News and Links") +
      blessedChalk.bgAnsi256(83).bold( "83 Eth News and Links") +
      blessedChalk.bgAnsi256(84).bold( "84 Eth News and Links") +
      blessedChalk.bgAnsi256(85).bold( "85 Eth News and Links") +
      blessedChalk.bgAnsi256(86).bold( "86 Eth News and Links") +
      blessedChalk.bgAnsi256(87).bold( "87 Eth News and Links") +
      blessedChalk.bgAnsi256(88).bold( "88 Eth News and Links") +
      blessedChalk.bgAnsi256(89).bold( "89 Eth News and Links") +
      blessedChalk.bgAnsi256(90).bold( "90 Eth News and Links") +
      blessedChalk.bgAnsi256(91).bold( "91 Eth News and Links") +
      blessedChalk.bgAnsi256(92).bold( "92 Eth News and Links") +
      blessedChalk.bgAnsi256(93).bold( "93 Eth News and Links") +
      blessedChalk.bgAnsi256(94).bold( "94 Eth News and Links") +
      blessedChalk.bgAnsi256(95).bold( "95 Eth News and Links") +
      blessedChalk.bgAnsi256(96).bold( "96 Eth News and Links") +
      blessedChalk.bgAnsi256(97).bold( "97 Eth News and Links") +
      blessedChalk.bgAnsi256(98).bold( "98 Eth News and Links") +
      blessedChalk.bgAnsi256(99).bold( "99 Eth News and Links") +
      blessedChalk.bgAnsi256(100).bold( "100 Eth News and Links") +
      blessedChalk.bgAnsi256(101).bold( "101 Eth News and Links") +
      blessedChalk.bgAnsi256(102).bold( "102 Eth News and Links") +
      blessedChalk.bgAnsi256(103).bold( "103 Eth News and Links") +
      blessedChalk.bgAnsi256(104).bold( "104 Eth News and Links") +
      blessedChalk.bgAnsi256(105).bold( "105 Eth News and Links") +
      blessedChalk.bgAnsi256(106).bold( "106 Eth News and Links") +
      blessedChalk.bgAnsi256(107).bold( "107 Eth News and Links") +
      blessedChalk.bgAnsi256(108).bold( "108 Eth News and Links") +
      blessedChalk.bgAnsi256(109).bold( "109 Eth News and Links") +
      blessedChalk.bgAnsi256(110).bold( "110 Eth News and Links") +
      blessedChalk.bgAnsi256(111).bold( "111 Eth News and Links") +
      blessedChalk.bgAnsi256(112).bold( "112 Eth News and Links") +
      blessedChalk.bgAnsi256(113).bold( "113 Eth News and Links") +
      blessedChalk.bgAnsi256(114).bold( "114 Eth News and Links") +
      blessedChalk.bgAnsi256(115).bold( "115 Eth News and Links") +
      blessedChalk.bgAnsi256(116).bold( "116 Eth News and Links") +
      blessedChalk.bgAnsi256(117).bold( "117 Eth News and Links") +
      blessedChalk.bgAnsi256(118).bold( "118 Eth News and Links") +
      blessedChalk.bgAnsi256(119).bold( "119 Eth News and Links") +
      blessedChalk.bgAnsi256(120).bold( "120 Eth News and Links") +
      blessedChalk.bgAnsi256(121).bold( "121 Eth News and Links") +
      blessedChalk.bgAnsi256(122).bold( "122 Eth News and Links") +
      blessedChalk.bgAnsi256(123).bold( "123 Eth News and Links") +
      blessedChalk.bgAnsi256(124).bold( "124 Eth News and Links") +
      blessedChalk.bgAnsi256(125).bold( "125 Eth News and Links") +
      blessedChalk.bgAnsi256(126).bold( "126 Eth News and Links") +
      blessedChalk.bgAnsi256(127).bold( "127 Eth News and Links") +
      blessedChalk.bgAnsi256(128).bold( "128 Eth News and Links") +
      blessedChalk.bgAnsi256(129).bold( "129 Eth News and Links") +
      blessedChalk.bgAnsi256(130).bold( "130 Eth News and Links") +
      blessedChalk.bgAnsi256(131).bold( "131 Eth News and Links") +
      blessedChalk.bgAnsi256(132).bold( "132 Eth News and Links") +
      blessedChalk.bgAnsi256(133).bold( "133 Eth News and Links") +
      blessedChalk.bgAnsi256(134).bold( "134 Eth News and Links") +
      blessedChalk.bgAnsi256(135).bold( "135 Eth News and Links") +
      blessedChalk.bgAnsi256(136).bold( "136 Eth News and Links") +
      blessedChalk.bgAnsi256(137).bold( "137 Eth News and Links") +
      blessedChalk.bgAnsi256(138).bold( "138 Eth News and Links") +
      blessedChalk.bgAnsi256(139).bold( "139 Eth News and Links") +
      blessedChalk.bgAnsi256(140).bold( "140 Eth News and Links") +
      blessedChalk.bgAnsi256(141).bold( "141 Eth News and Links") +
      blessedChalk.bgAnsi256(142).bold( "142 Eth News and Links") +
      blessedChalk.bgAnsi256(143).bold( "143 Eth News and Links") +
      blessedChalk.bgAnsi256(144).bold( "144 Eth News and Links") +
      blessedChalk.bgAnsi256(145).bold( "145 Eth News and Links") +
      blessedChalk.bgAnsi256(146).bold( "146 Eth News and Links") +
      blessedChalk.bgAnsi256(147).bold( "147 Eth News and Links") +
      blessedChalk.bgAnsi256(148).bold( "148 Eth News and Links") +
      blessedChalk.bgAnsi256(149).bold( "149 Eth News and Links") +
      blessedChalk.bgAnsi256(150).bold( "150 Eth News and Links") +
      blessedChalk.bgAnsi256(151).bold( "151 Eth News and Links") +
      blessedChalk.bgAnsi256(152).bold( "152 Eth News and Links") +
      blessedChalk.bgAnsi256(153).bold( "153 Eth News and Links") +
      blessedChalk.bgAnsi256(154).bold( "154 Eth News and Links") +
      blessedChalk.bgAnsi256(155).bold( "155 Eth News and Links") +
      blessedChalk.bgAnsi256(156).bold( "156 Eth News and Links") +
      blessedChalk.bgAnsi256(157).bold( "157 Eth News and Links") +
      blessedChalk.bgAnsi256(158).bold( "158 Eth News and Links") +
      blessedChalk.bgAnsi256(159).bold( "159 Eth News and Links") +
      blessedChalk.bgAnsi256(160).bold( "160 Eth News and Links") +
      blessedChalk.bgAnsi256(161).bold( "161 Eth News and Links") +
      blessedChalk.bgAnsi256(162).bold( "162 Eth News and Links") +
      blessedChalk.bgAnsi256(163).bold( "163 Eth News and Links") +
      blessedChalk.bgAnsi256(164).bold( "164 Eth News and Links") +
      blessedChalk.bgAnsi256(165).bold( "165 Eth News and Links") +
      blessedChalk.bgAnsi256(166).bold( "166 Eth News and Links") +
      blessedChalk.bgAnsi256(167).bold( "167 Eth News and Links") +
      blessedChalk.bgAnsi256(168).bold( "168 Eth News and Links") +
      blessedChalk.bgAnsi256(169).bold( "169 Eth News and Links") +
      blessedChalk.bgAnsi256(170).bold( "170 Eth News and Links") +
      blessedChalk.bgAnsi256(171).bold( "171 Eth News and Links") +
      blessedChalk.bgAnsi256(172).bold( "172 Eth News and Links") +
      blessedChalk.bgAnsi256(173).bold( "173 Eth News and Links") +
      blessedChalk.bgAnsi256(174).bold( "174 Eth News and Links") +
      blessedChalk.bgAnsi256(175).bold( "175 Eth News and Links") +
      blessedChalk.bgAnsi256(176).bold( "176 Eth News and Links") +
      blessedChalk.bgAnsi256(177).bold( "177 Eth News and Links") +
      blessedChalk.bgAnsi256(178).bold( "178 Eth News and Links") +
      blessedChalk.bgAnsi256(179).bold( "179 Eth News and Links") +
      blessedChalk.bgAnsi256(180).bold( "180 Eth News and Links") +
      blessedChalk.bgAnsi256(181).bold( "181 Eth News and Links") +
      blessedChalk.bgAnsi256(182).bold( "182 Eth News and Links") +
      blessedChalk.bgAnsi256(183).bold( "183 Eth News and Links") +
      blessedChalk.bgAnsi256(184).bold( "184 Eth News and Links") +
      blessedChalk.bgAnsi256(185).bold( "185 Eth News and Links") +
      blessedChalk.bgAnsi256(186).bold( "186 Eth News and Links") +
      blessedChalk.bgAnsi256(187).bold( "187 Eth News and Links") +
      blessedChalk.bgAnsi256(188).bold( "188 Eth News and Links") +
      blessedChalk.bgAnsi256(189).bold( "189 Eth News and Links") +
      blessedChalk.bgAnsi256(190).bold( "190 Eth News and Links") +
      blessedChalk.bgAnsi256(191).bold( "191 Eth News and Links") +
      blessedChalk.bgAnsi256(192).bold( "192 Eth News and Links") +
      blessedChalk.bgAnsi256(193).bold( "193 Eth News and Links") +
      blessedChalk.bgAnsi256(194).bold( "194 Eth News and Links") +
      blessedChalk.bgAnsi256(195).bold( "195 Eth News and Links") +
      blessedChalk.bgAnsi256(196).bold( "196 Eth News and Links") +
      blessedChalk.bgAnsi256(197).bold( "197 Eth News and Links") +
      blessedChalk.bgAnsi256(198).bold( "198 Eth News and Links") +
      blessedChalk.bgAnsi256(199).bold( "199 Eth News and Links") +
      blessedChalk.bgAnsi256(200).bold( "200 Eth News and Links") +
      blessedChalk.bgAnsi256(201).bold( "201 Eth News and Links") +
      blessedChalk.bgAnsi256(202).bold( "202 Eth News and Links") +
      blessedChalk.bgAnsi256(203).bold( "203 Eth News and Links") +
      blessedChalk.bgAnsi256(204).bold( "204 Eth News and Links") +
      blessedChalk.bgAnsi256(205).bold( "205 Eth News and Links") +
      blessedChalk.bgAnsi256(206).bold( "206 Eth News and Links") +
      blessedChalk.bgAnsi256(207).bold( "207 Eth News and Links") +
      blessedChalk.bgAnsi256(208).bold( "208 Eth News and Links") +
      blessedChalk.bgAnsi256(209).bold( "209 Eth News and Links") +
      blessedChalk.bgAnsi256(210).bold( "210 Eth News and Links") +
      blessedChalk.bgAnsi256(211).bold( "211 Eth News and Links") +
      blessedChalk.bgAnsi256(212).bold( "212 Eth News and Links") +
      blessedChalk.bgAnsi256(213).bold( "213 Eth News and Links") +
      blessedChalk.bgAnsi256(214).bold( "214 Eth News and Links") +
      blessedChalk.bgAnsi256(215).bold( "215 Eth News and Links") +
      blessedChalk.bgAnsi256(216).bold( "216 Eth News and Links") +
      blessedChalk.bgAnsi256(217).bold( "217 Eth News and Links") +
      blessedChalk.bgAnsi256(218).bold( "218 Eth News and Links") +
      blessedChalk.bgAnsi256(219).bold( "219 Eth News and Links") +
      blessedChalk.bgAnsi256(220).bold( "220 Eth News and Links") +
      blessedChalk.bgAnsi256(221).bold( "221 Eth News and Links") +
      blessedChalk.bgAnsi256(222).bold( "222 Eth News and Links") +
      blessedChalk.bgAnsi256(223).bold( "223 Eth News and Links") +
      blessedChalk.bgAnsi256(224).bold( "224 Eth News and Links") +
      blessedChalk.bgAnsi256(225).bold( "225 Eth News and Links") +
      blessedChalk.bgAnsi256(226).bold( "226 Eth News and Links") +
      blessedChalk.bgAnsi256(227).bold( "227 Eth News and Links") +
      blessedChalk.bgAnsi256(228).bold( "228 Eth News and Links") +
      blessedChalk.bgAnsi256(229).bold( "229 Eth News and Links") +
      blessedChalk.bgAnsi256(230).bold( "230 Eth News and Links") +
      blessedChalk.bgAnsi256(231).bold( "231 Eth News and Links") +
      blessedChalk.bgAnsi256(232).bold( "232 Eth News and Links") +
      blessedChalk.bgAnsi256(233).bold( "233 Eth News and Links") +
      blessedChalk.bgAnsi256(234).bold( "234 Eth News and Links") +
      blessedChalk.bgAnsi256(235).bold( "235 Eth News and Links") +
      blessedChalk.bgAnsi256(236).bold( "236 Eth News and Links") +
      blessedChalk.bgAnsi256(237).bold( "237 Eth News and Links") +
      blessedChalk.bgAnsi256(238).bold( "238 Eth News and Links") +
      blessedChalk.bgAnsi256(239).bold( "239 Eth News and Links") +
      blessedChalk.bgAnsi256(240).bold( "240 Eth News and Links") +
      blessedChalk.bgAnsi256(241).bold( "241 Eth News and Links") +
      blessedChalk.bgAnsi256(242).bold( "242 Eth News and Links") +
      blessedChalk.bgAnsi256(243).bold( "243 Eth News and Links") +
      blessedChalk.bgAnsi256(244).bold( "244 Eth News and Links") +
      blessedChalk.bgAnsi256(245).bold( "245 Eth News and Links") +
      blessedChalk.bgAnsi256(246).bold( "246 Eth News and Links") +
      blessedChalk.bgAnsi256(247).bold( "247 Eth News and Links") +
      blessedChalk.bgAnsi256(248).bold( "248 Eth News and Links") +
      blessedChalk.bgAnsi256(249).bold( "249 Eth News and Links") +
      blessedChalk.bgAnsi256(250).bold( "250 Eth News and Links") +
      blessedChalk.bgAnsi256(251).bold( "251 Eth News and Links") +
      blessedChalk.bgAnsi256(252).bold( "252 Eth News and Links") +
      blessedChalk.bgAnsi256(253).bold( "253 Eth News and Links") +
      blessedChalk.bgAnsi256(254).bold( "254 Eth News and Links")}
      
      </box>
    );
  // {elements} 
  }


// Creating our screen
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hello world'
});

// Adding a way to quit the program
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Rendering the React app using our screen
const component = render(<App />, screen);

