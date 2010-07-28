PACKED= Counting\ Sheep-pkg.wdgt
SCRIPT_PATH= Scripts/PseudoDashboard.js

# Packs the widget, creating a copy which will be devoured by Mac OS X
# when the widget is installed. Also removes the development library.
pack: clean Counting\ Sheep.wdgt
	cp -rfv Counting\ Sheep.wdgt $(PACKED)
	cat $(PACKED)/Main.html | sed 'N;s_\n  <script type="text/javascript" src="$(SCRIPT_PATH)"></script>__' > $(PACKED)/Main.html.tmp
	mv $(PACKED)/Main.html.tmp $(PACKED)/Main.html
	rm $(PACKED)/$(SCRIPT_PATH)

test: pack
	open $(PACKED)

clean:
	if [ -d $(PACKED) ]; then rm -r $(PACKED); fi
