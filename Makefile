##############################
# Definitions
##############################

USER_APPS = {index,puzzle,maze,bird,turtle,movie,music,pond/docs,pond/tutor,pond/duck,gallery}
ALL_JSON = {./,index,puzzle,maze,bird,turtle,movie,music,pond/docs,pond,pond/tutor,pond/duck,gallery}
ALL_TEMPLATES = template.soy,index/template.soy,puzzle/template.soy,maze/template.soy,bird/template.soy,turtle/template.soy,movie/template.soy,music/template.soy,pond/docs/template.soy,pond/template.soy,pond/tutor/template.soy,pond/duck/template.soy,gallery/template.soy

APP_ENGINE_THIRD_PARTY = third-party
SOY_COMPILER = java -jar third-party/SoyToJsSrcCompiler.jar --shouldProvideRequireSoyNamespaces --isUsingIjData
SOY_EXTRACTOR = java -jar third-party/SoyMsgExtractor.jar

REQUIRED_BINS = svn unzip wget java python sed

##############################
# Rules
# tg: maze-en index-en maze index parallel-en
#parallel-en maze-en tasks-en

##############################

all: deps languages

tg: index-en
index-en:
	mkdir -p generated/en/
	$(SOY_COMPILER) --outputPathFormat index/generated/en/soy.js --srcs index/template.soy
	python build-app.py index en

puzzle-en: common-en
	$(SOY_COMPILER) --outputPathFormat puzzle/generated/en/soy.js --srcs puzzle/template.soy
	python build-app.py puzzle en

maze-en: common-en
	$(SOY_COMPILER) --outputPathFormat maze/generated/en/soy.js --srcs maze/template.soy
	python build-app.py maze en

parallel-en: common-en
	$(SOY_COMPILER) --outputPathFormat parallel/generated/en/soy.js --srcs parallel/template.soy
	python build-app.py parallel en

tasks-en: common-en
	$(SOY_COMPILER) --outputPathFormat tasks/generated/en/soy.js --srcs tasks/template.soy
	python build-app.py tasks en

serial-en: common-en
	$(SOY_COMPILER) --outputPathFormat serial/generated/en/soy.js --srcs serial/template.soy
	python build-app.py serial en

bird-en: common-en
	$(SOY_COMPILER) --outputPathFormat bird/generated/en/soy.js --srcs bird/template.soy
	python build-app.py bird en

turtle-en: common-en
	$(SOY_COMPILER) --outputPathFormat turtle/generated/en/soy.js --srcs turtle/template.soy
	python build-app.py turtle en

movie-en: common-en
	$(SOY_COMPILER) --outputPathFormat movie/generated/en/soy.js --srcs movie/template.soy
	python build-app.py movie en

music-en: common-en
	$(SOY_COMPILER) --outputPathFormat music/generated/en/soy.js --srcs music/template.soy
	python build-app.py music en

pond-docs-en:
	mkdir -p pond/generated/en/
	$(SOY_COMPILER) --outputPathFormat pond/docs/generated/en/soy.js --srcs pond/docs/template.soy
	python build-app.py pond/docs en

pond-tutor-en: pond-common-en
	$(SOY_COMPILER) --outputPathFormat pond/tutor/generated/en/soy.js --srcs pond/tutor/template.soy
	python build-app.py pond/tutor en

pond-duck-en: pond-common-en
	$(SOY_COMPILER) --outputPathFormat pond/duck/generated/en/soy.js --srcs pond/duck/template.soy
	python build-app.py pond/duck en

genetics-en: common-en
	$(SOY_COMPILER) --outputPathFormat genetics/generated/en/soy.js --srcs genetics/template.soy
	python build-app.py genetics en

gallery-en: common-en
	$(SOY_COMPILER) --outputPathFormat gallery/generated/en/soy.js --srcs gallery/template.soy
	python build-app.py gallery en

pond-common-en: common-en
	$(SOY_COMPILER) --outputPathFormat pond/generated/en/soy.js --srcs pond/template.soy

common-en:
	$(SOY_COMPILER) --outputPathFormat generated/en/soy.js --srcs template.soy

en: index-en puzzle-en maze-en bird-en turtle-en movie-en music-en pond-docs-en pond-tutor-en pond-duck-en genetics-en gallery-en

index puzzle maze bird turtle movie music gallery: common
	@echo "Generating JS from $@/template.soy"
	mkdir -p $@/generated;
	i18n/json_to_js.py --output_dir $@/generated --template $@/template.soy json/*.json;
	python build-app.py $@ pt-br
	@echo

pond-docs: pond-common
	@echo "Generating JS from pond/docs/template.soy"
	mkdir -p pond/docs/generated;
	i18n/json_to_js.py --output_dir pond/docs/generated --template pond/docs/template.soy json/*.json;
	python build-app.py pond/docs
	@echo

pond-tutor: pond-common
	@echo "Generating JS from pond/tutor/template.soy"
	mkdir -p pond/tutor/generated;
	i18n/json_to_js.py --output_dir pond/tutor/generated --template pond/tutor/template.soy json/*.json;
	python build-app.py pond/tutor
	@echo

pond-duck: pond-common
	@echo "Generating JS from pond/duck/template.soy"
	mkdir -p pond/duck/generated;
	i18n/json_to_js.py --output_dir pond/duck/generated --template pond/duck/template.soy json/*.json;
	python build-app.py pond/duck
	@echo

pond-common: common
	@echo "Generating JS from pond/template.soy"
	mkdir -p pond/generated;
	i18n/json_to_js.py --output_dir pond/generated --template pond/template.soy json/*.json;
	@echo

common: soy-to-json
	@echo "Generating JS from template.soy"
	mkdir -p generated;
	i18n/json_to_js.py --output_dir generated --template template.soy json/*.json;
	@echo

soy-to-json:
	@echo "Converting Soy files to JSON for Translatewiki."
	@# Create extracted_msgs.xlf with all messages from all soy files.
	$(SOY_EXTRACTOR) --outputFile extracted_msgs.xlf --srcs $(ALL_TEMPLATES)
	@# Creates json/en.json, json/qqq.json, json/keys.json.
	@# Deletes extracted_msgs.xlf
	i18n/xliff_to_json.py --xlf extracted_msgs.xlf --templates $(ALL_TEMPLATES)
	@echo

languages: soy-to-json
	@for app in $(ALL_JSON); do \
	  echo "Generating JS from $$app/template.soy"; \
	  mkdir -p $$app/generated; \
	  i18n/json_to_js.py --output_dir $$app/generated --template $$app/template.soy json/*.json; \
	  echo; \
	done
	@for app in $(USER_APPS); do \
	  python build-app.py $$app; \
	done

deps:
	$(foreach bin,$(REQUIRED_BINS),\
	    $(if $(shell command -v $(bin) 2> /dev/null),$(info Found `$(bin)`),$(error Please install `$(bin)`)))
	@# All following commands are in third-party, use backslashes to keep them on the same line as the cd command.
	cd third-party; \
	svn checkout https://github.com/google/closure-library/trunk/closure/bin/build build; \
	wget -N https://dl.google.com/closure-templates/closure-templates-for-javascript-latest.zip; \
	unzip -o closure-templates-for-javascript-latest.zip SoyToJsSrcCompiler.jar; \
	unzip -o closure-templates-for-javascript-latest.zip -d ../$(APP_ENGINE_THIRD_PARTY) soyutils_usegoog.js; \
	wget -N https://dl.google.com/closure-templates/closure-templates-msg-extractor-latest.zip; \
	unzip -o closure-templates-msg-extractor-latest.zip SoyMsgExtractor.jar; \
	wget -N https://dl.google.com/closure-compiler/compiler-latest.zip; \
	unzip -o compiler-latest.zip -x COPYING README.md; \
	mv -f closure-compiler-v*.jar closure-compiler.jar; \
	chmod +x build/closurebuilder.py

	mkdir -p $(APP_ENGINE_THIRD_PARTY)
	svn checkout https://github.com/google/closure-library/trunk/closure/goog/ $(APP_ENGINE_THIRD_PARTY)/goog
	svn checkout https://github.com/google/closure-library/trunk/third_party/closure/goog/ $(APP_ENGINE_THIRD_PARTY)/third_party_goog
	svn checkout https://github.com/ajaxorg/ace-builds/trunk/src-min-noconflict/ $(APP_ENGINE_THIRD_PARTY)/ace
	svn checkout https://github.com/google/blockly/branches/develop/ $(APP_ENGINE_THIRD_PARTY)/blockly
	svn checkout https://github.com/CreateJS/SoundJS/trunk/lib/ $(APP_ENGINE_THIRD_PARTY)/SoundJS
	cp -R third-party/soundfonts $(APP_ENGINE_THIRD_PARTY)/

	@# messages.js confuses the compiler by also providing "Blockly.Msg.en".
	rm $(APP_ENGINE_THIRD_PARTY)/blockly/msg/messages.js

	svn checkout https://github.com/NeilFraser/JS-Interpreter/trunk/ $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter
	@# Remove @license tag so compiler will strip Google's license.
	sed 's/@license//' $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter/interpreter.js > $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter/interpreter_.js
	@# Compile JS-Interpreter using SIMPLE_OPTIMIZATIONS because the Music game needs to mess with the stack.
	java -jar third-party/closure-compiler.jar\
	 --language_out ECMASCRIPT5_STRICT\
	 --js $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter/acorn.js\
	 --js $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter/interpreter_.js\
	 --js_output_file $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter/compressed.js
	rm $(APP_ENGINE_THIRD_PARTY)/JS-Interpreter/interpreter_.js

clean: clean-languages clean-deps

clean-languages:
	rm -rf $(ALL_JSON)/generated
	rm -f json/keys.json

clean-deps:
	mv third-party/soundfonts third-party-soundfonts
	rm -rf $(APP_ENGINE_THIRD_PARTY)
	rm -rf third-party
	mkdir -p third-party
	mv third-party-soundfonts third-party/soundfonts

# Prevent non-traditional rules from exiting with no changes.
.PHONY: deps
