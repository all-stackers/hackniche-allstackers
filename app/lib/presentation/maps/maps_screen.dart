import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

// void main() {
//   runApp(MaterialApp(
//     title: 'Google Maps Example',
//     home: MapsScreen(),
//   ));
// }

class MapsScreen extends StatefulWidget {
  const MapsScreen({Key? key}) : super(key: key);

  @override
  State<MapsScreen> createState() => _MapsScreenState();
}

class _MapsScreenState extends State<MapsScreen> {
  final Completer<GoogleMapController> controller = Completer();

  static const LatLng sourceLocation =
      LatLng(19.089259281052314, 72.83572332641313);
  static const LatLng destination =
      LatLng(19.107302886261866, 72.83735625198179);

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

  void getPolyPoints() async {
    PolylinePoints polylinePoints = PolylinePoints();

    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
        google_api_key,
        PointLatLng(sourceLocation.latitude, sourceLocation.longitude),
        PointLatLng(destination.latitude, destination.longitude));

    if (result.points.isNotEmpty) {
      result.points.forEach((PointLatLng point) =>
          polylineCoordinates.add(LatLng(point.latitude, point.longitude)));

      setState(() {});
    }
  }

  @override
  void initState() {
    super.initState();
    //getCurrentLocation();
    getPolyPoints();
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
            target: LatLng(sourceLocation.latitude, sourceLocation.longitude),
            zoom: 14.5),
        polylines: {
          Polyline(
              polylineId: PolylineId("route"),
              color: Colors.blue,
              points: polylineCoordinates,
              width: 3)
        },
        markers: {
          Marker(
              markerId: MarkerId("currentLocation"),
              icon: currentLocationIcon,
              position: LatLng(destination.latitude, destination.longitude)),
          Marker(
              markerId: MarkerId("source"),
              icon: sourceIcon,
              position: destination),
          Marker(
              markerId: MarkerId("destination"),
              icon: destinationIcon,
              position: sourceLocation)
        },
        onMapCreated: (mapController) {
          controller.complete(mapController);
        },
      ),
    );
  }
}
