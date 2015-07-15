(function() {
  var $, editor_instance,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $ = jQuery;

  editor_instance = 'annotator-field-0';

  Annotator.Plugin.RichText = (function(_super) {

    __extends(RichText, _super);

    function RichText() {
      this.convertText = __bind(this.convertText, this);
      this.updateText = __bind(this.updateText, this);
      this.saveText = __bind(this.saveText, this);
      RichText.__super__.constructor.apply(this, arguments);
    }

    RichText.prototype.pluginInit = function() {
      var editor,
        _this = this;
      if (!Annotator.supported()) return;
      editor = this.annotator.editor;
      CKEDITOR.replace(editor_instance, {
        extraPlugins: 'lineutils,oembed,widget',
        toolbar: [
          {
            name: 'paragraph',
            items: ['NumberedList', 'BulletedList']
          }, {
            name: 'links',
            items: ['Link', 'Unlink']
          }, {
            name: 'insert',
            items: ['oembed']
          }
        ],
        removePlugins: 'elementspath,font,resize',
        allowedContent: true,
        autoUpdateElement: true
      });
      this.annotator.subscribe('annotationEditorShown', function(Editor, annotation) {
        return _this.updateText(Editor, annotation);
      });
      this.annotator.subscribe('annotationEditorSubmit', function(Editor, annotation) {
        return _this.saveText(Editor, annotation);
      });
      return this.annotator.subscribe('annotationViewerShown', function(Viewer) {
        return _this.convertText(Viewer);
      });
    };

    RichText.prototype.saveText = function(Editor, annotation) {
      CKEDITOR.instances[editor_instance].updateElement();
      return annotation.text = CKEDITOR.instances[editor_instance].getData();
    };

    RichText.prototype.updateText = function(Editor, annotation) {
      return CKEDITOR.instances[editor_instance].setData(annotation.text);
    };

    RichText.prototype.convertText = function(Viewer) {
      var annotation, div, index, _results;
      _results = [];
      for (index in Viewer.annotations) {
        div = $(Viewer.element[0]).find('div:first-of-type')[index];
        annotation = Viewer.annotations[index];
        if (annotation.text != null) {
          annotation.text = annotation.text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
        }
        _results.push(div.innerHTML = annotation.text);
      }
      return _results;
    };

    return RichText;

  })(Annotator.Plugin);

}).call(this);