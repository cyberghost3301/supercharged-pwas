import { AppLayout } from '@supercharged/ui';
import { Editor } from './components/Editor';

function App() {
  return (
    <AppLayout title="LocalMD" showSidebar>
      <Editor />
    </AppLayout>
  )
}

export default App
