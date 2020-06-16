import Controller from '@ember/controller';

export default class Application extends Controller.extend({}) {

    sample1 = `import braininfo

def setup(brainNodeControlObj, BrainNodeClass):
    ''' Must return a class that inherits from BrainNodeClass. '''
    class BrainNode(BrainNodeClass):
        def initialize(self):
            ''' Called at node initialization, before first pump.'''
            super(BrainNode, self).initialize()
  
        def finalize(self, val):
            ''' Called at node end, after last pump call. '''
            super(BrainNode, self).finalize(val)
  
        def pump(self, quant):
            ''' Will continue to be called until False is returned.
  
            INSERT PROCESSING CODE HERE'''
  
            return False
    return BrainNode`;

    pythonKeywords = ['and','as','assert','break','class','continue','def','del','elif','else','except','exec','finally','for','from','global','if','import','in','is','lambda','None','not','or','pass','print','raise','return','self','try','while','with','yield','int','float','long','complex','hex','abs','all','any','apply','basestring','bin','bool','buffer','bytearray','callable','chr','classmethod','cmp','coerce','compile','complex','delattr','dict','dir','divmod','enumerate','eval','execfile','file','filter','format','frozenset','getattr','globals','hasattr','hash','help','id','input','intern','isinstance','issubclass','iter','len','locals','list','map','max','memoryview','min','next','object','oct','open','ord','pow','print','property','reversed','range','raw_input','reduce','reload','repr','reversed','round','set','setattr','slice','sorted','staticmethod','str','sum','super','tuple','type','unichr','unicode','vars','xrange','zip','True','False','__dict__','__methods__','__members__','__class__','__bases__','__name__','__mro__','__subclasses__','__init__','__import__'];
    inputFieldNames = ['in1', 'in2', 'fields'];
    inputMetaData = [{
        label:"color:string",
        insertText: "color",
        range:{}
    },
    {
        label: "id:int",
        insertText: "id",
        range:{}
    },
    {
        label: "type:string",
        insertText: "type",
        range:{}
    },
    {
        label: "rand:int",
        insertText: "rand",
        range:{}
    },
    {
        label: "junk:string",
        insertText: "junk",
        range:{}
    },
    {
        label: "name:unicode",
        insertText: "name",
        range:{}
    },
    {
        label: "IOU:double",
        insertText: "IOU",
        range:{}
    },
    {
        label: "overdue:boolean",
        insertText: "overdue",
        range:{}
    },
    {
        label: "dueDate:date",
        insertText: "dueDate",
        range:undefined
    },
    {
        label: "dueTime:time",
        insertText: "dueTime",
        range:undefined
    },
    {
        label: "create:datetime",
        insertText: "create",
        range:undefined
    }];

    editorReady(monaco:any) {
        console.log(monaco)
    }

    completionItemProvider(context:any) {

        const { word, range } = context;
        const { pythonKeywords, inputFieldNames, inputMetaData } = this;

        
        if (inputFieldNames.includes(word.word))  {
            inputMetaData.forEach(d => d.range = range);
            return { suggestions: inputMetaData };
        } 

        // const suggestions = pythonKeywords.map(label => { return {label, insertText:label} }); 
        // This seems to override the existing tokens autocomplete
        
        return { suggestions: [] };

    }
}

declare module '@ember/controller' {
  interface Registry {
    application: Application;
  }
}
