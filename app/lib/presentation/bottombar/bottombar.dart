import 'package:flutter/material.dart';
import 'package:razor_pay/presentation/discounts_offers_screen/discounts_offers_screen.dart';
import 'package:razor_pay/presentation/food_trucks/foodtruck.dart';
import 'package:razor_pay/presentation/maps/maps_screen.dart';
import 'package:razor_pay/presentation/maps/markers.dart';
import 'package:razor_pay/presentation/post/create_post.dart';

class BottomBar extends StatefulWidget {
  @override
  _BottomBarState createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  int _currentIndex = 0;

  final List<Widget> _children = [
    FoodTruckScreen(),
    Markers(),
    CreatePostScreen(),
  ];

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _children[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: onTabTapped,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.menu),
            label: 'Menu',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.map),
            label: 'Maps',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.create),
            label: 'Create Post',
          ),
        ],
      ),
    );
  }
}
