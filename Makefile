PACKED=Counting\ Sheep-pkg.wdgt

# Packs the widget, creating a copy which will be devoured by Mac OS X
# when the widget is installed. Also removes the development library.
pack: Counting\ Sheep.wdgt
	cp -r Counting\ Sheep.wdgt $(PACKED)

test: pack
	open $(PACKED)

clean: $(PACKED)
	rm -r $(PACKED)
