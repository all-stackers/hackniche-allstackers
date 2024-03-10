import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:razor_pay/presentation/maps/maps_screen.dart';

// void main() {
//   runApp(MaterialApp(
//     title: 'Google Maps Example',
//     home: Markers(),
//   ));
// }

class Markers extends StatefulWidget {
  const Markers({Key? key}) : super(key: key);

  @override
  State<Markers> createState() => _MarkersState();
}

class _MarkersState extends State<Markers> {
  final Completer<GoogleMapController> controller = Completer();

  List markers = [
    {
      "id": 1,
      "name": "Mahaveer Nagar",
      "position": {"lat": 19.212066396963568, "lng": 72.84151656266168},
      "high_sold": ["Biryani", "Vada Pav", "Pani Puri"],
      "date": "2023-10-15"
    },
    {
      "id": 2,
      "name": "Andheri",
      "position": {"lat": 19.12022601251796, "lng": 72.8469948770579},
      "high_sold": ["Pizza", "Burger", "Kebab"],
      "date": "2023-11-20"
    },
    {
      "id": 3,
      "name": "Bangur Nagar",
      "position": {"lat": 19.165443583372745, "lng": 72.84226215809923},
      "high_sold": ["Samosa", "Chaat", "Dosa"],
      "date": "2023-12-25"
    },
    {
      "id": 4,
      "name": "Juhu Beach",
      "position": {"lat": 19.089259281052314, "lng": 72.83572332641313},
      "high_sold": ["Biryani", "Vada Pav", "Pani Puri"],
      "date": "2023-10-15"
    },
    {
      "id": 5,
      "name": "Nariman point",
      "position": {"lat": 18.924160146679263, "lng": 72.82452142095832},
      "high_sold": ["Pizza", "Burger", "Kebab"],
      "date": "2023-11-20"
    },
    {
      "id": 6,
      "name": "Thunga Malad",
      "position": {"lat": 19.18646677012782, "lng": 72.88037578986679},
      "high_sold": ["Samosa", "Chaat", "Dosa"],
      "date": "2023-12-25"
    }
  ];
  static const LatLng mahaver = LatLng(19.212066396963568, 72.84151656266168);
  static const LatLng andheri = LatLng(19.12022601251796, 72.8469948770579);
  static const LatLng bangur = LatLng(19.165443583372745, 72.84226215809923);
  static const LatLng juhu = LatLng(19.089259281052314, 72.83572332641313);
  static const LatLng nariman = LatLng(18.924160146679263, 72.82452142095832);
  static const LatLng thunga = LatLng(19.18646677012782, 72.88037578986679);

  List<LatLng> polylineCoordinates = [];
  // LocationData? currentLocation;

  BitmapDescriptor sourceIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor destinationIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor currentLocationIcon = BitmapDescriptor.defaultMarker;

  String google_api_key = "AIzaSyD4U__ddSGVEOpQY-gdy1_x9d4NBGFzH04";

  // void getCurrentLocation() async {
  //   Location location = Location();

  //   location.getLocation().then((location) {
  //     currentLocation = location;
  //   });
  //   GoogleMapController googleMapController = (await controller.future);
  //   location.onLocationChanged.listen((event) {
  //     currentLocation = event;
  //     googleMapController.animateCamera(CameraUpdate.newCameraPosition(
  //         CameraPosition(
  //             zoom: 13.5, target: LatLng(event.latitude!, event.longitude!))));
  //     setState(() {});
  //   });
  // }

  Future<void> setCustomMarkerIcon() async {
    final double iconSize = 20;
    final sourceIconBitmap = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(2, 20)),
      "assets/images/source.png",
    );
    final destinationIconBitmap = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(20, 20)),
      "assets/images/destination.png",
    );
    final truckIconBitmap = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(20, 20)),
      "assets/images/truck.png",
    );

    setState(() {
      sourceIcon = sourceIconBitmap;
      destinationIcon = destinationIconBitmap;
      currentLocationIcon = truckIconBitmap;
    });
  }

  // void getPolyPoints() async {
  //   PolylinePoints polylinePoints = PolylinePoints();

  //   PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
  //       google_api_key,
  //       PointLatLng(sourceLocation.latitude, sourceLocation.longitude),
  //       PointLatLng(destination.latitude, destination.longitude));

  //   if (result.points.isNotEmpty) {
  //     result.points.forEach((PointLatLng point) =>
  //         polylineCoordinates.add(LatLng(point.latitude, point.longitude)));
  //   }
  // }

  @override
  void initState() {
    super.initState();
    //getCurrentLocation();
    //getPolyPoints();
    setCustomMarkerIcon();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:
          // currentLocation == null
          //     ? const Center(
          //         child: Text("Loading"),
          //       )          :
          GoogleMap(
        initialCameraPosition: CameraPosition(
            target: LatLng(mahaver.latitude, mahaver.longitude), zoom: 14.5),
        // polylines: {
        //   Polyline(
        //       polylineId: PolylineId("route"),
        //       points: polylineCoordinates,
        //       color: Colors.red,
        //       width: 6)
        // },
        markers: {
          Marker(
            markerId: MarkerId("currentLocation"),
            icon: currentLocationIcon,
            position: LatLng(mahaver.latitude, mahaver.longitude),
          ),
          Marker(
            markerId: MarkerId("source"),
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MapsScreen()));
            },
            icon: currentLocationIcon,
            //icon: sourceIcon,
            position: mahaver,
          ),
          Marker(
            markerId: MarkerId("destination1"),
            icon: currentLocationIcon,
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MapsScreen()));
            },
            //icon: destinationIcon,
            position: thunga,
          ),
          Marker(
            markerId: MarkerId("destination2"),
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MapsScreen()));
            },
            icon: currentLocationIcon,
            //icon: destinationIcon,
            position: andheri,
          ),
          Marker(
            markerId: MarkerId("destination3"),
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MapsScreen()));
            },
            icon: currentLocationIcon,
            //icon: destinationIcon,
            position: bangur,
          ),
          Marker(
            markerId: MarkerId("destination4"),
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MapsScreen()));
            },
            icon: currentLocationIcon,
            //icon: destinationIcon,
            position: juhu,
          ),
          Marker(
            markerId: MarkerId("destination5"),
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => MapsScreen()));
            },
            icon: currentLocationIcon,
            //icon: destinationIcon,
            position: nariman,
          ),
        },
      ),
    );
  }
}
