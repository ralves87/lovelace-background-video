![Lovelace Background Video](img/lovelace-background-video-example.gif)

# Lovelace Background Video

The **Lovelace Background Video** module allows you to add animated videos as a background for Lovelace in Home Assistant. It is highly configurable, enabling dynamic background changes based on views or entity states.

---

## 📋 Features

- **Dynamic Configuration**:
  - Change the background based on **views** or **entity states**.
- **Opacity Control**:
  - Adjust video opacity for smoother visual effects.
- **Full Compatibility**:
  - Works on modern browsers and mobile devices (supports `playsInline` on iOS).

---

## ⚙️ Requirements

- **Home Assistant**: 2023.10.0 or later.
- **HACS (Home Assistant Community Store)**:
  - Recommended for easy installation and module management.
- **Media Files**:
  - Ensure that the videos or images used are placed in the `www` folder of Home Assistant.

---

## 📦 Installation

### 1. Via HACS (Recommended)

1. **Install HACS** (if you haven't already). You can follow the instructions [here](https://hacs.xyz/).
2. Add the repository to HACS:
   - Go to **HACS > Settings > Custom Repositories**.
   - Add the GitHub repository link:
     ```
     https://github.com/ralves87/lovelace-background-video
     ```
   - Choose the **Dashboard** category.
3. Install the **Lovelace Background Video** module in HACS.
4. Restart Home Assistant.

### 2. Manual Installation

1. Download the files from the GitHub repository.
2. Place the `background-video.js` file in the folder:
    ```
    /config/www/community/lovelace-background-video/
    ```
3. Restart Home Assistant.
4. Manually add the resource:
   - Go to **Settings > Dashboard > Resources**.
   - Enter the path:
     ```
     /local/community/lovelace-background-video/background-video.js
     ```

---

## 🛠️ Configuration

The **Lovelace Background Video** module can be configured in the **`ui-lovelace.yaml`** file (YAML mode) or directly in the **Lovelace graphical editor**.

---

### Basic Example

Add the basic configuration to your `ui-lovelace.yaml` file:

```yaml
background_video:
  default_url: "/local/community/lovelace-background-video/default-background.mp4"
```
### Advanced Configuration

Here is a complete configuration example::

```yaml
background_video:
  default_url: "/local/community/lovelace-background-video/default-background.mp4"
  opacity: 0.8  # Default video opacity (0.0 to 1.0)
  views:
    - path: "home"
      config:
        default_url: "/local/community/lovelace-background-video/home-background.mp4"
        opacity: 0.5  # Specific opacity for the "home" view
        entity: "sensor.weather_state"  # Sensor that controls the background state
        state_url:
          sunny: "/local/community/lovelace-background-video/sunny.mp4"  # Background for "sunny" state
          rainy: "/local/community/lovelace-background-video/rainy.mp4"  # Background for "rainy" state
    - path: "dashboard"
      config:
        default_url: "/local/community/lovelace-background-video/dashboard-background.mp4"
        opacity: 0.7  # Specific opacity for the "dashboard" view
```

## 📖 Configuration Options

### Global Options
Global options are defined directly under `background_video` and apply to all views unless overridden.

| Property          | Type     | Default | Description                                                               |
|-------------------|----------|---------|---------------------------------------------------------------------------|
| `default_url`     | `string` | -       | Path to the default video or image used as the background.                |
| `opacity`         | `number` | 1.0     | Sets the video opacity. Values range from `0.0` (transparent) to `1.0`.   |

---

### View-Specific Options
You can configure specific backgrounds for each **view** in Lovelace.

| Property            | Type       | Default  | Description                                                               |
|---------------------|------------|----------|---------------------------------------------------------------------------|
| `path`              | `string`   | -        | The view’s path in Lovelace (usually visible in the URL).                 |
| `config.default_url`| `string`   | -        | Path to the specific video or image for this view.                        |
| `config.opacity`    | `number`   | 1.0      | Specific opacity for the background of this view.                         |
| `config.entity`     | `string`   | -        | Entity that controls the background state.                                |
| `config.state_url`  | `object`   | -        | A dictionary mapping entity states to specific URLs.                      |

---

### Example of `state_url`

You can configure different backgrounds based on an entity’s state. For example:

```yaml
state_url:
  sunny: "/local/community/lovelace-background-video/sunny.mp4"
  rainy: "/local/community/lovelace-background-video/rainy.mp4"
  cloudy: "/local/community/lovelace-background-video/cloudy.mp4"
```

### Explanation:
When the configured entity (e.g., sensor.weather_state) is in the state sunny, the video sunny.mp4 will be displayed. You can map as many states as needed.

## 📜 Licença

This project is licensed under the **MIT License**.

### Rights Granted by the License:
- **Free Use**: You are allowed to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.
- **No Restrictions**: Permission is granted without limitations, as long as the license is included in all copies or substantial portions of the software.

### Conditions:
This software is provided “as is”, without any warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or its use.

For more details, see the full license text at [MIT License](https://opensource.org/licenses/MIT).

















MIT License

Copyright (c) [Ano] [Seu Nome]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.