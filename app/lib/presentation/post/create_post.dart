import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class CreatePostScreen extends StatefulWidget {
  @override
  _CreatePostScreenState createState() => _CreatePostScreenState();
}

class _CreatePostScreenState extends State<CreatePostScreen> {
  File? _selectedImage;

  Future<void> _pickImage(ImageSource source) async {
    final pickedFile = await ImagePicker().pickImage(source: source);

    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
      });
    }
  }

  String _caption = '';
  List<String> _tags = [];

  void _addTag(String tag) {
    setState(() {
      _tags.add(tag);
    });
  }

  void _removeTag(int index) {
    setState(() {
      _tags.removeAt(index);
    });
  }

  void _onCaptionChanged(String value) {
    setState(() {
      _caption = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Post'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _selectedImage != null
                ? Image.file(_selectedImage!, height: 200, width: 200)
                : Icon(Icons.image, size: 100),
            SizedBox(height: 20),
            Row(
              children: [
                ElevatedButton(
                  onPressed: () {
                    _pickImage(ImageSource.gallery); // Pick image from gallery
                  },
                  child: Text('Select from Gallery'),
                ),
                SizedBox(width: 20),
                ElevatedButton(
                  onPressed: () {
                    _pickImage(ImageSource.camera); // Capture image from camera
                  },
                  child: Text('Capture from Camera'),
                ),
              ],
            ),
            SizedBox(height: 16.0),
            TextField(
              onChanged: _onCaptionChanged,
              decoration: InputDecoration(
                hintText: 'Enter Caption',
              ),
            ),
            SizedBox(height: 16.0),
            Wrap(
              spacing: 8.0,
              runSpacing: -8.0,
              children: _tags
                  .asMap()
                  .entries
                  .map(
                    (entry) => Chip(
                      label: Text(entry.value),
                      onDeleted: () => _removeTag(entry.key),
                    ),
                  )
                  .toList(),
            ),
            SizedBox(height: 8.0),
            ElevatedButton(
              onPressed: () {
                // Open tag selection dialog
                _addTag('Tag1'); // Add selected tag
              },
              child: Text('Add Tag'),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Implement post creation logic
                print('Caption: $_caption');
                print('Tags: $_tags');
              },
              child: Text('Post'),
            ),
            SizedBox(height: 16.0),
            Text(
              'Preview',
              style: Theme.of(context).textTheme.headline6,
            ),
            SizedBox(height: 8.0),
            _selectedImage != null ? Image.file(_selectedImage!) : Text(""),
            SizedBox(height: 8.0),
            Text(
              _caption,
              style: Theme.of(context).textTheme.subtitle1,
            ),
            Wrap(
              spacing: 8.0,
              runSpacing: -8.0,
              children: _tags
                  .map(
                    (tag) => Chip(
                      label: Text(tag),
                      backgroundColor: Colors.grey[300],
                    ),
                  )
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}
