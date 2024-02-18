// import 'package:flutter/material.dart';
// import 'package:razor_pay/presentation/discounts_offers_screen/widgets/listvectorsixtyone_item_widget.dart';
// // import 'package:graphs/bar.dart';
// // import 'package:graphs/circular.dart';
// // import 'package:graphs/custome_image.dart';
// // import 'package:graphs/image_constants.dart';
// // import 'package:graphs/line.dart';

// // void main() {
// //   runApp(const MyApp());
// // }

// // class MyApp extends StatefulWidget {
// //   const MyApp({Key? key}) : super(key: key);

// //   @override
// //   State<MyApp> createState() => _MyAppState();
// // }

// // class _MyAppState extends State<MyApp> {
// //   @override
// //   Widget build(BuildContext context) {
// //     return const MaterialApp(
// //       debugShowCheckedModeBanner: false,
// //       home: MyHomePage(),
// //     );
// //   }
// // }

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({Key? key}) : super(key: key);

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage>
//     with SingleTickerProviderStateMixin {
//   late TabController _tabController;

//   @override
//   void initState() {
//     super.initState();
//     _tabController = TabController(length: 3, vsync: this, initialIndex: 2);
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: const Color.fromARGB(238, 255, 255, 255),
//       appBar: AppBar(
//         leading: IconButton(
//           icon: Icon(Icons.arrow_back),
//           onPressed: () {
//             Navigator.of(context).pop();
//           },
//         ),
//         title: const Text('Charts App'),
//       ),
//       body: Container(
//         margin: EdgeInsets.only(top: 10),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             const SizedBox(height: 20),
//             TabBar(
//               controller: _tabController,
//               tabs: const [
//                 Tab(text: 'Veg'),
//                 Tab(text: 'Non-Veg'),
//                 Tab(text: 'Jain'),
//               ],
//             ),
//             Container(
//               height: 220,
//               width: MediaQuery.of(context).size.width * 1,
//               child: TabBarView(
//                 controller: _tabController,
//                 children: const [
//                   ListvectorsixtyoneItemWidget(/* pass veg food products */),
//                   ListvectorsixtyoneItemWidget(/* pass veg food products */),
//                   ListvectorsixtyoneItemWidget(/* pass veg food products */),
//                 ],
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
